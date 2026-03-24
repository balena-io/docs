const fs = require('fs');
const path = require('path');

const nodeSDKDocsDir = path.join(
	__dirname,
	'../pages/external-docs/sdk/node-sdk',
);
const inputPath = path.resolve(nodeSDKDocsDir);
const outputDir = path.join(__dirname, '../pages/reference/sdk/node-sdk');
const outputPath = path.resolve(outputDir);
const semver = require('semver'); // If you have semver installed, otherwise use a regex split

function sortVersions(a, b) {
	if (a.name === 'latest') return -1;
	if (b.name === 'latest') return 1;

	// Clean 'v' prefix if present for comparison
	const vA = a.name.startsWith('v') ? a.name.slice(1) : a.name;
	const vB = b.name.startsWith('v') ? b.name.slice(1) : b.name;

	try {
		// Sort descending (latest/highest first)
		return semver.rcompare(vA, vB);
	} catch (e) {
		// Fallback if not valid semver
		return vB.localeCompare(vA, undefined, { numeric: true });
	}
}

/**
 * Recursively builds the SUMMARY.md lines for a directory.
 */
function generateSummaryLines(dir, baseRelativePath, level = 0) {
	const items = fs.readdirSync(dir, { withFileTypes: true });
	let lines = [];
	const indent = '  '.repeat(level + 2); // +2 to indent under the "Node SDK" header

	// Top-level (Version folders) sorting
	if (level === 0) {
		items.sort(sortVersions);
	} else {
		// Sub-folder/File sorting: Alphabetical
		items.sort((a, b) => a.name.localeCompare(b.name));
	}

	for (const item of items) {
		if (item.name === 'README.md') {
			continue; // Skip READMEs as they are handled by the folder link
		}
		const fullPath = path.join(dir, item.name);
		const relativePath = path.join(baseRelativePath, item.name);
		let displayName = item.name.replace('.md', '');

		// Capitalization for display
		displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

		if (item.isDirectory()) {
			const linkPath = path.join(relativePath, 'README.md');

			// Peek at README to see if it's deprecated (only for version-level folders)
			let deprecatedSuffix = '';
			if (level === 0) {
				const readmeContent = fs.readFileSync(
					path.join(fullPath, 'README.md'),
					'utf8',
				);
				if (readmeContent.includes('(DEPRECATED)')) {
					deprecatedSuffix = ' (DEPRECATED)';
				}
			}

			lines.push(`${indent}* [${displayName}${deprecatedSuffix}](${linkPath})`);
			// Recurse into subdirectories
			lines.push(...generateSummaryLines(fullPath, relativePath, level + 1));
		} else if (item.name.endsWith('.md')) {
			lines.push(`${indent}* [${displayName}](${relativePath})`);
		}
	}
	return lines;
}

function flattenHeadings(content) {
	// Find the highest (fewest #) heading level in this specific block
	const allHeadings = [...content.matchAll(/^(#{2,6})\s/gm)];
	if (allHeadings.length === 0) {
		return content;
	}

	// Get the numeric level of the highest heading (e.g., #### is 4)
	const topLevelFound = Math.min(...allHeadings.map((m) => m[1].length));

	// Calculate shift: We want the top-most item to be '##' (2).
	// If topLevelFound is 5 (#####), shiftAmount is 3.
	// If topLevelFound is 2 (##), shiftAmount is 0.
	const shiftAmount = topLevelFound - 2;

	let lines = content.split('\n');

	return lines
		.map((line) => {
			const headingMatch = line.match(/^(#{2,6})\s(.*)/);
			if (headingMatch) {
				const currentLevel = headingMatch[1].length;
				const text = headingMatch[2];

				// Apply the shift
				const shiftedLevel = currentLevel - shiftAmount;

				if (shiftedLevel === 2) {
					return `## ${text}`;
				} else if (shiftedLevel === 3) {
					return `### ${text}`;
				} else {
					// shiftedLevel > 3 (Original was too deep)
					// Convert to Bold so it doesn't break GitBook hierarchy
					return `**${text}**`;
				}
			}
			return line;
		})
		.join('\n');
}

/**
 * SIGNATURE FORMATTING & TOC STRIPPING
 * - Formats the first line (signature) as code.
 * - Removes redundant bulleted TOC links.
 * - Returns the modified string.
 */
function formatSectionContent(content) {
	let lines = content.split('\n');
	if (lines.length > 0) {
		let signature = lines[0].replace(/^#+\s+/, '');
		lines[0] = `**${signature.trim()}**\n`;

		// Strip redundant bulleted TOC
		// Removes lines like: * [.methodName](#anchor)
		lines = lines.filter((line) => {
			const trimmed = line.trim();
			// Matches bullet points that contain internal anchor links (#)
			const isTOCItem =
				(trimmed.startsWith('*') || trimmed.startsWith('-')) &&
				trimmed.includes('(#');
			return !isTOCItem;
		});
	}
	// Collapse excessive newlines
	return lines
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function createFiles(content, outputDir) {
	// Identify all sections based on the <a name="..."> anchors where the name starts with `balena.` and is not followed by anymore dots
	// So catch `balena.models` but not `balena.models.application`
	// And catch the content following it until the next anchor.
	const nextAnchor = outputDir.endsWith('models')
		? 'balena\\.models'
		: 'balena';

	const pattern = new RegExp(
		`<a name="(${nextAnchor}\\.[^.]+)"><\\/a>([\\s\\S]*?)(?=<a name="${nextAnchor}\\.[^.]+"><\\/a>|$)`,
		'g',
	);
	let match;

	// Try to find the next match; if you find one, save it to the variable match and run the loop; if you don't find any more, stop
	// When a Regular Expression has the g (global) flag, the pattern object becomes "stateful."
	// It remembers the index where the last match ended in a property called lastIndex
	while ((match = pattern.exec(content)) !== null) {
		let fileName = match[1].split('.').pop(); // e.g., match[1]: "balena.models", we want "models"
		let sectionContent = match[2].trim();

		if (fileName === 'models') {
			const modelsPath = path.join(outputDir, 'models');
			if (!fs.existsSync(modelsPath)) {
				fs.mkdirSync(modelsPath, { recursive: true });
			}

			fs.writeFileSync(path.join(modelsPath, `README.md`), '# Models');
			// Pass the section content without the `### balena.models : <code>object</code>`
			createFiles(
				formatSectionContent(
					sectionContent.split('\n').slice(1).join('\n').trim(),
				),
				modelsPath,
			); // Recursive call to split models into subfiles
		} else {
			// The regex captures the 3 specific pieces of data we need to build the new string
			const anchorHeadingsPattern =
				/(?:\*\s\*\s\*\s*)?<a name="([^"]+)"><\/a>\s*(#+)\s*([^\n\r]+)/g;

			// The replacement string references those captured groups using $1, $2, and $3
			sectionContent = sectionContent.replace(
				anchorHeadingsPattern,
				'$2 $1\n**$3**',
			);

			/**
			 * Turn snippets like:
			 * ```
			 * ## balena.auth.authenticate
			 * **auth.authenticate(credentials) ⇒ <code>Promise</code>**
			 * ```
			 * into:
			 * ```
			 * ## authenticate
			 *
			 * **balena.auth.authenticate(credentials) ⇒ <code>Promise</code>**
			 * ```
			 */
			sectionContent = sectionContent.replace(
				/(#+)\s+(balena\.(?:.*\.)?([^.\s]+))\s*\n\*\*([^*]+)\*\*/g,
				(_match, hashes, fullHeading, lastPart, boldContent) => {
					// We target the beginning of the bold text (stopping at the first space, parenthesis, or colon)
					// and replace it with the completely fully-qualified heading string.
					const newBoldContent = boldContent.replace(/^[^\s(<:]+/, fullHeading);

					// Stitch it back together using the captured hashes, the isolated last part, and the new bold string
					return `${hashes} ${lastPart}\n**${newBoldContent}**\n`;
				},
			);

			// Some auth model methods have a md links hardcoded as `#balena.models.auth.X`
			// This should correct them to `#X`
			sectionContent = sectionContent.replace(
				/\[([^\]]+)\]\(#balena\.(?:.*\.)?([^.)]+)\)/g,
				'[$1](#$2)',
			);

			// Flatten headings to fit GitBook's 3-size limit
			sectionContent = flattenHeadings(formatSectionContent(sectionContent));

			const title = `# ${fileName.charAt(0).toUpperCase()}${fileName.slice(1)}`;
			const fileBody = `${title}\n\n${sectionContent}`;

			fs.writeFileSync(path.join(outputDir, `${fileName}.md`), fileBody);
		}
	}
}

function splitDocs(inputDir, outputDir) {
	// Create base output directory if it doesn't exist
	if (fs.existsSync(outputDir)) {
		fs.rmSync(outputDir, { recursive: true, force: true });
	}
	fs.mkdirSync(outputDir, { recursive: true });

	if (!fs.existsSync(inputDir)) {
		console.error(`ERROR: Source directory not found: ${inputDir}`);
		process.exit(1);
	}

	// There are multiple files in this directory. Each one is dedicated to a different version of the node SDK
	const files = fs.readdirSync(inputDir);

	files.forEach((file) => {
		// Each version gets its own folder in the output directory, named after the version
		const versionName = path.parse(file).name;
		const versionOutputDir = path.join(outputDir, versionName);

		if (!fs.existsSync(versionOutputDir)) {
			fs.mkdirSync(versionOutputDir, { recursive: true });
		}

		const filePath = path.join(inputDir, file);
		const content = fs.readFileSync(filePath, 'utf8');

		const firstSplitMarker = '\n## Modules';
		const firstSplitParts = content.split(firstSplitMarker);

		let title =
			firstSplitParts[0].trim().charAt(0).toUpperCase() +
			firstSplitParts[0].trim().slice(1);

		const secondSplitMarker = '\n## balena-sdk\n';
		const secondSplitParts = firstSplitParts[1].split(secondSplitMarker);
		const thirdSplitMarker = '<a name="balena"></a>';
		const thirdSplitParts = secondSplitParts
			.slice(1)
			.join(secondSplitMarker)
			.split(thirdSplitMarker);
		const mainReadmeContent = `\n\n${secondSplitMarker.trim()}\n\n${thirdSplitParts[0].trim()}`;

		// Create the README
		fs.writeFileSync(
			path.join(versionOutputDir, 'README.md'),
			title +
				formatSectionContent(mainReadmeContent)
					.replace(/\n\n\* \* \*/g, '')
					.replace(/\n\n<a name="[^"]+"><\/a>/g, ''),
		);

		const fourthSplitMarker = '<a name="balena.errors"></a>';
		const fourthSplitParts = thirdSplitParts[1].split(fourthSplitMarker);

		// The remaining content (starting with the introSplitMarker)
		const remainingContent = fourthSplitMarker + fourthSplitParts[1];

		createFiles(remainingContent, versionOutputDir);
	});

	const summaryPath = path.resolve(__dirname, '../pages/SUMMARY.md');
	let summaryLines = fs.readFileSync(summaryPath, 'utf8').split('\n');

	// Find where the Node SDK section starts
	const startIndex = summaryLines.findIndex((line) =>
		line.includes('[Node SDK](reference/sdk/node-sdk/README.md)'),
	);

	if (startIndex !== -1) {
		// Find where the Node SDK section ends.
		// We look for the next line that is a top-level bullet (indented by 0 or 2 spaces)
		// but is NOT a child of Node SDK (like Python SDK).
		let endIndex = summaryLines.findIndex(
			(line, idx) =>
				idx > startIndex &&
				line.trim().startsWith('* [') &&
				!line.startsWith('    '), // Not deeply indented
		);

		// If no next SDK is found, we go to the end of the file
		if (endIndex === -1) {
			endIndex = summaryLines.length;
		}

		const newEntries = generateSummaryLines(
			outputPath,
			'reference/sdk/node-sdk',
		);

		// Splice the new entries into the array
		// We keep the startIndex line itself, and replace everything until endIndex
		summaryLines.splice(
			startIndex + 1,
			endIndex - (startIndex + 1),
			...newEntries,
		);

		fs.writeFileSync(summaryPath, summaryLines.join('\n'));
	} else {
		console.error('Could not find Node SDK entry in SUMMARY.md');
	}
}

splitDocs(inputPath, outputPath);
