#!/usr/bin/env node

/**
 * Sync documentation from external.
 *
 * Reads external-docs.json and processes:
 * - sources: GitHub repos at pinned versions (managed by Renovate)
 * - versionedSources: Multi-version docs (CLI, SDK) with dictionary generation
 *   NOTE: The `ref` field is a Renovate tracking anchor only. Actual versions
 *   are discovered dynamically from GitHub releases API, not from `ref`.
 * - dynamic: GitHub API calls (org repos, not version-tracked)
 *
 * Supports transforms: extract-section, prepend
 *
 * Usage:
 *   node tools/sync-external.js           # Sync all sources
 *   node tools/sync-external.js --dry-run # Preview without writing
 *   node tools/sync-external.js --source balena-supervisor  # Sync specific source by id
 *   node tools/sync-external.js --repo balena-io/balena-sdk # Sync all sources from a repo
 *   node tools/sync-external.js --skip-dynamic  # Skip dynamic sources (org repos)
 */

const fs = require('fs');
const path = require('path');
const { updateSummaryFileWithSection } = require('./utils');
require('dotenv').config();

const ROOT_DIR = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'external-docs.json');
const SUMMARY_PATH = path.join(ROOT_DIR, 'pages/', 'SUMMARY.md');
const SEPARATOR = '='.repeat(60);
const GITHUB_API_BASE = 'https://api.github.com';
const HEADER_REGEX = /^#+\s+/;

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_DYNAMIC = args.includes('--skip-dynamic');
const SOURCE_INDEX = args.indexOf('--source');
const SOURCE_FILTER = SOURCE_INDEX !== -1 ? args[SOURCE_INDEX + 1] : null;
const REPO_INDEX = args.indexOf('--repo');
const REPO_FILTER = REPO_INDEX !== -1 ? args[REPO_INDEX + 1] : null;

// GitHub token for API requests (optional, but recommended to avoid rate limits)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Track failures in sources that don't throw (we still want to exit non-zero)
let hasDynamicFailures = false;
let hasVersionedFailures = false;

/**
 * Log error and exit with non-zero status
 */
function fatal(message) {
	console.error(message);
	process.exit(1);
}

/**
 * Fetch content from a URL with optional authorization and JSON parsing
 */
async function fetchContentFromGithub(
	url,
	{ auth = false, json = false } = {},
) {
	console.log(`  Fetching: ${url}`);
	const response = await fetch(url, {
		headers: {
			...(auth && GITHUB_TOKEN
				? { Authorization: `token ${GITHUB_TOKEN}` }
				: {}),
		},
	});
	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${url}: ${response.status} ${response.statusText}`,
		);
	}
	try {
		if (json) {
			return await response.json();
		} else {
			return await response.text();
		}
	} catch (err) {
		throw new Error(`Failed to parse response from ${url}: ${err.message}`);
	}
}

// returns summary content for the files that were downloaded successfully
async function downloadFolderFromGithub(repo, folderPath, ref, targetDir) {
	// Get the recursive tree manifest
	const treeUrl = `https://api.github.com/repos/${repo}/git/trees/${ref}?recursive=1`;

	const response = await fetch(treeUrl, {
		headers: {
			Accept: 'application/vnd.github.v3+json',
			...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
		},
	});

	if (!response.ok) {
		throw new Error(`Manifest fetch failed: ${response.statusText}`);
	}

	// Grab only the array of files and folders
	const { tree } = await response.json();

	// Filter for the folder we need
	const files = tree
		.filter(
			// blobs are files, trees are folders. Downloading a tree would just yield another json manifest. We will create the folders ourselves
			(item) => item.path.startsWith(folderPath) && item.type === 'blob',
		)
		// Ensure introduction.md comes first within its directory, then sort alphabetically by filename, then by directory path
		.sort((a, b) => {
			const dirA = path.dirname(a.path);
			const dirB = path.dirname(b.path);

			// If the files are in the same directory, check for introduction.md
			if (dirA === dirB) {
				const nameA = path.basename(a.path).toLowerCase();
				const nameB = path.basename(b.path).toLowerCase();

				if (nameA === 'introduction.md') {
					return -1;
				}
				if (nameB === 'introduction.md') {
					return 1;
				}

				return nameA.localeCompare(nameB); // otherwise, alphabetical by filename
			}

			// These next lines are to blend folders and files together
			// Otherwise, all files would be sorted before folders regardless of alphabetization
			const segmentsA = a.path.split('/');
			const segmentsB = b.path.split('/');

			// Find the first path segment where they don't match
			let i = 0;
			while (
				i < segmentsA.length &&
				i < segmentsB.length &&
				segmentsA[i] === segmentsB[i]
			) {
				i++;
			}

			// These are the diverging segments (could be a filename or a subfolder name)
			let segA = segmentsA[i] || '';
			let segB = segmentsB[i] || '';

			// If one of these segments is an introduction file, force it to the top of this branch
			if (segA.toLowerCase() === 'introduction.md') {
				return -1;
			}
			if (segB.toLowerCase() === 'introduction.md') {
				return 1;
			}

			// Strip extensions so that `.md` files are compared fairly against folders
			segA = segA.replace(/\.md$/i, '').toLowerCase();
			segB = segB.replace(/\.md$/i, '').toLowerCase();

			return segA.localeCompare(segB);
		});

	if (files.length === 0) {
		return '';
	}

	console.log(`Found ${files.length} files. Starting parallel sync...`);

	let summaryContent = '';
	for (const file of files) {
		const rawUrl = `https://raw.githubusercontent.com/${repo}/${ref}/${file.path}`;
		const destLatter = file.path.split(folderPath)[1];
		const dest = path.join(targetDir, destLatter);
		const dirName = path.dirname(dest);
		const summaryPath = dest.split('pages/')[1];

		try {
			const content = await fetchContentFromGithub(rawUrl, {
				auth: true,
				json: false,
			});

			// Ensure folders exist and save the file
			fs.mkdirSync(dirName, { recursive: true });
			fs.writeFileSync(dest, content);

			const readmePath = path.join(dirName, 'README.md');
			const indentDepth = destLatter.split('/').length;
			if (dirName !== targetDir && !fs.existsSync(readmePath)) {
				const folderDisplayName =
					path.basename(dirName).charAt(0).toUpperCase() +
					path.basename(dirName).slice(1);
				fs.writeFileSync(readmePath, `# ${folderDisplayName}`, 'utf-8');
				summaryContent += `${'  '.repeat(indentDepth - 1)}* [${folderDisplayName}](${summaryPath
					.split('/')
					.slice(0, -1)
					.join('/')}/README.md)\n`;
			}
			const fileDisplayName =
				path.basename(dest, '.md').charAt(0).toUpperCase() +
				path.basename(dest, '.md').slice(1);
			summaryContent += `${'  '.repeat(indentDepth)}* [${fileDisplayName}](${summaryPath})\n`;

			console.log(`Synced: ${file.path}`);
		} catch (err) {
			console.error(`Error syncing ${file.path}: ${err.message}`);
		}
	}

	return summaryContent;
}

/**
 * Extract a section from markdown content.
 * Finds a header matching the section name and captures content until
 * hitting another header at the same or higher level.
 * Throws if section is not found.
 */
function extractSection(content, sectionName) {
	const lines = content.split('\n');
	const result = [];
	let capturing = false;
	let headerLevel = 0;

	for (const line of lines) {
		// Check if this line is a header matching our section
		const headerMatch = line.match(/^(#+)\s+(.+)$/);

		if (headerMatch) {
			const level = headerMatch[1].length;
			const title = headerMatch[2].trim();

			if (title === sectionName) {
				// Found our section, start capturing (but don't include the header itself)
				capturing = true;
				headerLevel = level;
				continue;
			} else if (capturing && level <= headerLevel) {
				// Hit a same-level or higher-level header, stop capturing
				break;
			}
		}

		if (capturing) {
			result.push(line);
		}
	}

	// Fail if section was not found
	if (!capturing) {
		const headers = lines
			.filter((line) => HEADER_REGEX.test(line))
			.map((line) => line.replace(HEADER_REGEX, '').trim());
		throw new Error(
			`Section "${sectionName}" not found in ${headers.length} headers: ${headers.join(', ')}`,
		);
	}

	// Trim leading/trailing empty lines
	let start = 0;
	while (start < result.length && result[start].trim() === '') {
		start++;
	}
	let end = result.length - 1;
	while (end >= start && result[end].trim() === '') {
		end--;
	}

	return result.slice(start, end + 1).join('\n') + '\n';
}

const TRANSFORMS = {
	'extract-section': (content, transform) =>
		extractSection(content, transform.section),
	prepend: (content, transform) => transform.content + content,
};

/**
 * Apply transforms to content
 */
function applyTransform(content, transform) {
	if (!transform) {
		throw new Error('applyTransform called without transform argument');
	}
	console.log(
		`  Applying transform: ${transform.type}${transform.section ? ` (${transform.section})` : ''}`,
	);
	const handler = TRANSFORMS[transform.type];
	if (!handler) {
		throw new Error(
			`Unknown transform type: "${transform.type}". Valid types: ${Object.keys(TRANSFORMS).join(', ')}`,
		);
	}
	return handler(content, transform);
}

/**
 * Build GitHub raw content URL for a specific ref
 * Validates that filePath doesn't contain path traversal sequences
 */
function buildRawUrl(repo, ref, filePath) {
	if (filePath.includes('..') || path.isAbsolute(filePath)) {
		throw new Error(`Invalid file path (path traversal detected): ${filePath}`);
	}
	return `https://raw.githubusercontent.com/${repo}/${ref}/${filePath}`;
}

/**
 * Ensure directory exists for a file path
 * Respects DRY_RUN mode - won't create directories during dry run
 */
function ensureDir(filePath) {
	if (!DRY_RUN) {
		fs.mkdirSync(path.dirname(filePath), { recursive: true });
	}
}

/**
 * Write content to a file, handling DRY_RUN mode
 * Validates that targetPath stays within ROOT_DIR (defense against path traversal)
 */
function writeFile(targetPath, content, label = null) {
	// Validate path stays within ROOT_DIR
	const resolvedPath = path.resolve(targetPath);
	const resolvedRoot = path.resolve(ROOT_DIR);
	const relativePath = path.relative(resolvedRoot, resolvedPath);
	if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
		throw new Error(`Target path outside root directory: ${targetPath}`);
	}

	const displayPath = label || path.relative(ROOT_DIR, targetPath);
	if (DRY_RUN) {
		console.log(
			`  [DRY-RUN] Would write to: ${displayPath} (${content.length} bytes)`,
		);
	} else {
		ensureDir(targetPath);
		fs.writeFileSync(targetPath, content);
		console.log(`  Written: ${displayPath} (${content.length} bytes)`);
	}
}

/**
 * Process a single source
 */
async function processSource(source) {
	console.log(`\n[${source.id}] Processing ${source.repo}@${source.ref}`);

	for (const file of source.files) {
		const url = buildRawUrl(source.repo, source.ref, file.source);
		const targetPath = path.join(ROOT_DIR, file.target);

		let content = await fetchContentFromGithub(url);

		if (file.transform) {
			if (!Array.isArray(file.transform)) {
				content = applyTransform(content, file.transform);
			} else {
				for (const t of file.transform) {
					content = applyTransform(content, t);
				}
			}
		}

		writeFile(targetPath, content, file.target);
	}
}

/**
 * Process dynamic GitHub org repos source
 */
async function processDynamicOrgRepos(source) {
	console.log(`\n[${source.id}] Fetching repos from org: ${source.org}`);

	const url = `${GITHUB_API_BASE}/orgs/${source.org}/repos?per_page=${source.perPage || 30}`;
	const targetPath = path.join(ROOT_DIR, source.target);

	try {
		const repos = await fetchContentFromGithub(url, { auth: true, json: true });

		// Sort by stars descending
		repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

		// Build markdown table
		const lines = ['Name|Description', '---|---'];
		for (const repo of repos) {
			const description = (repo.description || '')
				.replace(/\\/g, '\\\\')
				.replace(/\|/g, '\\|');
			lines.push(`[${repo.name}](${repo.html_url})|${description}`);
		}

		const content = lines.join('\n') + '\n';
		writeFile(targetPath, content, `${source.target} (${repos.length} repos)`);
	} catch (error) {
		// Don't throw for dynamic sources - they may be rate limited
		console.error(`  ERROR: ${error.message}`);
		console.error(
			`  Warning: Skipping ${source.id} due to error (will report failure)`,
		);
		hasDynamicFailures = true;
	}
}

const DYNAMIC_SOURCE_HANDLERS = {
	'github-org-repos': processDynamicOrgRepos,
};

/**
 * Process a dynamic source based on its type
 */
async function processDynamicSource(source) {
	const handler = DYNAMIC_SOURCE_HANDLERS[source.type];
	if (!handler) {
		throw new Error(
			`Unknown dynamic source type: "${source.type}". Valid types: ${Object.keys(DYNAMIC_SOURCE_HANDLERS).join(', ')}`,
		);
	}
	await handler(source);
}

/**
 * Remove the first line from content (header line removal)
 * This matches versioning.js behavior
 */
function removeFirstLine(content) {
	const lines = content.split('\n');
	return lines.slice(1).join('\n');
}

/**
 * Fetch releases from GitHub API for a repository
 */
async function fetchReleases(repo, maxPages = 3) {
	console.log(`  Fetching releases from ${repo}...`);
	const allReleases = [];

	for (let page = 1; page <= maxPages; page++) {
		const url = `${GITHUB_API_BASE}/repos/${repo}/releases?per_page=100&page=${page}`;
		try {
			const releases = await fetchContentFromGithub(url, {
				auth: true,
				json: true,
			});

			if (!Array.isArray(releases) || releases.length === 0) {
				break;
			}

			allReleases.push(...releases);

			// Early exit once we have 10+ semantic versions - covers ~5 major versions
			// (each with latest patch) which is our maximum tracking depth
			const semanticCount = allReleases.filter((r) =>
				/^v?\d+\.\d+\.\d+$/.test(r.tag_name),
			).length;
			if (semanticCount >= 10) {
				break;
			}
		} catch (error) {
			// Page 1 failure is critical - we have no data to work with
			if (page === 1) {
				const hint = !GITHUB_TOKEN
					? ' (hint: set GITHUB_TOKEN to avoid rate limits)'
					: '';
				throw new Error(
					`Failed to fetch releases for ${repo}: ${error.message}${hint}`,
				);
			}
			// Later page failures are warnings - we have partial data
			console.error(
				`  Warning: Partial release data - page ${page} failed: ${error.message}`,
			);
			break;
		}
	}

	return allReleases;
}

/**
 * Determine which versions to track based on releases
 * Logic adapted from versioning.js:
 * - Latest major version (marked as 'latest')
 * - Previous major versions released within 1 year of latest
 * - At least 5 major versions if available
 * - Versions older than 1 year marked as 'deprecated'
 */
function determineVersionsToTrack(releases) {
	// Filter to semantic versions and parse
	const semanticReleases = releases
		.filter((r) => /^v?\d+\.\d+\.\d+$/.test(r.tag_name))
		.map((r) => ({
			tag: r.tag_name,
			major: parseInt(r.tag_name.replace('v', '').split('.')[0], 10),
			date: new Date(r.published_at),
		}))
		.sort((a, b) => b.date - a.date);

	if (semanticReleases.length === 0) {
		return [];
	}

	// Get latest release of each major version
	const byMajor = new Map();
	for (const release of semanticReleases) {
		if (!byMajor.has(release.major)) {
			byMajor.set(release.major, release);
		}
	}

	const latestByMajor = Array.from(byMajor.values()).sort(
		(a, b) => b.major - a.major,
	);
	const [latestRelease] = latestByMajor;

	// Calculate 1-year cutoff from latest release
	const oneYearAgo = new Date(latestRelease.date);
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

	// Select versions: within 1 year, or up to 5 total
	const selectedVersions = [];
	for (const release of latestByMajor) {
		const isLatest = release.major === latestRelease.major;
		const withinOneYear = release.date >= oneYearAgo;
		const needMore = selectedVersions.length < 5;

		if (!isLatest && !withinOneYear && !needMore) {
			continue;
		}

		let policy = 'supported';
		if (isLatest) {
			policy = 'latest';
		} else if (release.date < oneYearAgo) {
			policy = 'deprecated';
		}

		selectedVersions.push({
			tag: release.tag,
			major: release.major,
			date: release.date,
			policy,
		});
	}

	return selectedVersions;
}

/**
 * Process versioned sources (CLI, SDK, Python SDK)
 * Dynamically fetches releases and determines which versions to track.
 *
 * NOTE: The `ref` field in versionedSources is NOT used for fetching content.
 * It exists solely as a Renovate tracking anchor to trigger PRs when new
 * versions are released. The actual versions synced are determined dynamically
 * from the GitHub releases API.
 */
async function processVersionedSources(manifest) {
	const versionedSources = manifest.versionedSources || [];

	if (versionedSources.length === 0) {
		return;
	}

	console.log(`\nProcessing ${versionedSources.length} versioned source(s)...`);

	for (const source of versionedSources) {
		let summaryContent = '';
		console.log(
			`\n[${source.id}] Processing versioned docs from ${source.repo}`,
		);

		// Fetch releases and determine versions to track
		const releases = await fetchReleases(source.repo);
		const versionsToTrack = determineVersionsToTrack(releases);

		if (versionsToTrack.length === 0) {
			console.log(`  Warning: No semantic versions found, skipping`);
			continue;
		}

		console.log(
			`  Found ${versionsToTrack.length} versions to track: ${versionsToTrack.map((v) => v.tag).join(', ')}`,
		);

		const dictionaryEntries = [];
		const targetDir = path.join(ROOT_DIR, source.targetDir);

		// Ensure target directory exists (and is clean)
		if (!DRY_RUN) {
			if (fs.existsSync(targetDir)) {
				fs.rmSync(targetDir, { recursive: true });
			}
			fs.mkdirSync(targetDir, { recursive: true });
		}

		for (const version of versionsToTrack) {
			const pageTitle =
				`${version.policy === 'latest' ? 'Latest' : version.tag} ${version.policy === 'deprecated' ? '(DEPRECATED)' : ''}`.trim();

			const versionId = version.policy === 'latest' ? 'latest' : version.tag;
			const targetPath = path.join(targetDir, `${versionId}.md`);

			let file = source.file;

			// Assume source.file is a folder if it ends with a slash
			if (file.endsWith('/')) {
				let downloadedSummaryContent = '';
				try {
					downloadedSummaryContent = await downloadFolderFromGithub(
						source.repo,
						file,
						`refs/tags/${version.tag}`,
						path.join(targetDir, versionId),
					);
				} catch (error) {
					if (source.fallback === undefined) {
						throw error;
					}
				}
				if (downloadedSummaryContent.length > 0) {
					fs.writeFileSync(
						path.join(targetDir, versionId, 'README.md'),
						`# ${pageTitle}`,
						'utf-8',
					);
					summaryContent += `* [${pageTitle}](${source.targetDir.split('pages/')[1]}/${versionId}/README.md)\n`;
					summaryContent += downloadedSummaryContent;
					continue;
				}
				file = source.fallback;
			}
			const url = buildRawUrl(source.repo, `refs/tags/${version.tag}`, file);
			console.log(`  Version: ${version.tag} (${version.policy})`);

			try {
				let content = await fetchContentFromGithub(url);
				content = removeFirstLine(content);
				content =
					`# ${pageTitle}\n\n${version.policy === 'latest' ? '## ' + version.tag + '\n\n' : ''}` +
					content;

				if (DRY_RUN) {
					console.log(
						`  [DRY-RUN] Would write to: ${source.targetDir}/${versionId}.md (${content.length} bytes)`,
					);
				} else {
					fs.writeFileSync(targetPath, content);
					console.log(
						`  Written: ${source.targetDir}/${versionId}.md (${content.length} bytes)`,
					);
				}
				summaryContent += `* [${pageTitle}](${source.targetDir.split('pages/')[1]}/${versionId}.md)\n`;
			} catch (error) {
				console.error(`  ERROR fetching ${version.tag}: ${error.message}`);
				hasVersionedFailures = true;
			}

			// Build dictionary entry with display name based on policy
			const policySuffix =
				version.policy === 'supported' ? '' : ` ${version.policy}`;
			dictionaryEntries.push({
				id: versionId,
				name: `${version.tag}${policySuffix}`,
				version: version.tag,
			});
		}

		// Write dictionary file
		if (dictionaryEntries.length > 0) {
			const dictionaryPath = path.join(ROOT_DIR, source.dictionary);
			const dictionaryContent =
				JSON.stringify(dictionaryEntries, null, 2) + '\n';
			writeFile(
				dictionaryPath,
				dictionaryContent,
				`${source.dictionary} (${dictionaryEntries.length} versions)`,
			);
		}
		await updateSummaryFileWithSection(
			summaryContent,
			source.summarySectionTitle,
		);
	}
}

const isVersioned = (text) => {
	// extract the url inside the parentheses of a markdown link
	const match = text.match(/\(([^)]+)\)[^()]*$/);
	const target = match ? match[1] : text;
	const filename = path.basename(target).toLowerCase().replace('.md', '');
	// check if it follows the pattern of 'latest' or semantic versioning (vX.Y.Z or X.Y.Z)
	return filename === 'latest' || /^(v)?\d+\.\d+\.\d+/.test(filename);
};

/**
 * Print final status and exit
 */
function finish() {
	console.log('\n' + SEPARATOR);
	if (hasDynamicFailures || hasVersionedFailures) {
		fatal('Sync completed with errors (see above)');
	}
	console.log('Sync complete!');
}

/**
 * Load and parse the manifest file
 */
function loadManifest() {
	if (!fs.existsSync(MANIFEST_PATH)) {
		fatal(`Manifest not found: ${MANIFEST_PATH}`);
	}

	try {
		return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
	} catch (error) {
		fatal(`Failed to parse manifest: ${error.message}`);
	}
}

/**
 * Main entry point
 */
async function main() {
	console.log(SEPARATOR);
	console.log('External Documentation Sync');
	console.log(SEPARATOR);

	if (DRY_RUN) {
		console.log('\n[DRY-RUN MODE] No files will be written\n');
	}

	if (!GITHUB_TOKEN) {
		console.log(
			'Warning: GITHUB_TOKEN not set. API calls may be rate limited.\n',
		);
	}

	const manifest = loadManifest();

	// Handle --repo filter: process all sources from a specific repo
	if (REPO_FILTER) {
		console.log(`Filtering by repo: ${REPO_FILTER}\n`);

		const matchingSources = manifest.sources.filter(
			(s) => s.repo === REPO_FILTER,
		);
		const matchingVersioned =
			manifest.versionedSources?.filter((s) => s.repo === REPO_FILTER) || [];

		if (matchingSources.length === 0 && matchingVersioned.length === 0) {
			fatal(`No sources found for repo: ${REPO_FILTER}`);
		}

		if (matchingSources.length > 0) {
			console.log(
				`Processing ${matchingSources.length} pinned source(s) from ${REPO_FILTER}...`,
			);
			// for (const source of matchingSources) {
			// 	await processSource(source);
			// }
		}

		if (matchingVersioned.length > 0) {
			await processVersionedSources({ versionedSources: matchingVersioned });
		}

		return finish();
	}

	// Handle --source filter: find and process a single source by id
	if (SOURCE_FILTER) {
		const source = manifest.sources.find((s) => s.id === SOURCE_FILTER);
		if (source) {
			await processSource(source);
			return finish();
		}

		const versionedSource = manifest.versionedSources?.find(
			(s) => s.id === SOURCE_FILTER,
		);
		if (versionedSource) {
			await processVersionedSources({ versionedSources: [versionedSource] });
			return finish();
		}

		const dynamicSource = manifest.dynamic?.find((s) => s.id === SOURCE_FILTER);
		if (dynamicSource) {
			await processDynamicSource(dynamicSource);
			return finish();
		}

		fatal(`Source not found: ${SOURCE_FILTER}`);
	}

	// Process all sources
	console.log(`Processing ${manifest.sources.length} pinned source(s)...`);
	for (const source of manifest.sources) {
		await processSource(source);
	}

	if (manifest.versionedSources) {
		await processVersionedSources(manifest);
	}

	if (!SKIP_DYNAMIC && manifest.dynamic) {
		console.log(`\nProcessing ${manifest.dynamic.length} dynamic source(s)...`);
		for (const source of manifest.dynamic) {
			await processDynamicSource(source);
		}
	}

	finish();
}

main().catch((error) => {
	console.error('\nFatal error:', error.message);
	if (error.stack) {
		console.error('\nStack trace:');
		console.error(error.stack);
	}
	process.exit(1);
});
