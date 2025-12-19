#!/usr/bin/env node

/**
 * GitHub Repository Documentation Versioning Tool
 * 
 * This script fetches GitHub repository releases and creates versioned documentation
 * for integration with static site generators. It handles rate limiting gracefully
 * with fallback mechanisms and provides robust error handling.
 * 
 * Key Features:
 * - Smart pagination to avoid GitHub API limits
 * - Semantic version filtering and processing
 * - Fallback mechanisms for API failures
 * - Automatic documentation download from GitHub raw URLs
 * - Support for authentication via GITHUB_TOKEN environment variable
 * 
 * Usage: node versioning.js <github-repo-url> [noversionheadings]
 */

const https = require('https');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const parseGithubUrl = require('./github-parser');
const LineByLineReader = require('line-by-line');

// Configuration constants
const CONFIG = {
  MAX_PAGES: 5,
  PER_PAGE: 100,
  REQUEST_TIMEOUT: 10000,
  MIN_SEMANTIC_VERSIONS: 10,
  MIN_COMPATIBLE_TAGS: 5,
  ONE_YEAR_IN_MS: 365 * 24 * 60 * 60 * 1000
};

// Template for mapping repo names to config file names
const VERSIONS_CONFIG_TEMPLATE = {
  "balenasdk": "nodesdk",
  "balenasdkpython": "pythonsdk",
};

// Initialize GitHub token
const githubToken = initializeGitHubToken();

/**
 * Initialize and validate GitHub token from environment
 * @returns {string|null} GitHub token or null if not provided
 */
function initializeGitHubToken() {
  const token = process.env.GITHUB_TOKEN || null;
  if (!token) {
    console.log('WARNING: GITHUB_TOKEN not provided in the environment. Versioning scripts might get rate-limited.');
  }
  return token;
}

/**
 * Configures GitHub API request options with authentication and headers
 * @param {string} endpoint - GitHub API endpoint path
 * @returns {Object} HTTPS request configuration options
 */
function githubRequestOptions(endpoint) {
  const options = {
    hostname: 'api.github.com',
    path: endpoint,
    method: 'GET',
    headers: {
      'User-Agent': 'Node.js GitHub Tags Fetcher',
      'Accept': 'application/vnd.github+json',
    }
  };

  // Add authentication token if available
  if (githubToken) {
    options.headers['Authorization'] = `Bearer ${githubToken}`;
  }

  return options
}

/**
 * Creates a safe fallback version when GitHub API fails
 * @returns {Array} Always returns a valid "latest" version entry
 */
function createSafeFallback() {
  const currentDate = new Date();
  return [
    { 
      id: "latest", 
      name: "latest", 
      version: "latest", 
      releaseDate: currentDate 
    }
  ];
}

/**
 * Filters tags to only include semantic version tags
 * @param {Array} tagsWithDates - List of tags with their release dates
 * @returns {Array} Filtered and sorted semantic version tags
 */
function filterSemanticVersionTags(tagsWithDates) {
  return tagsWithDates
    .filter(tag => isSemanticVersion(tag.name))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Checks if a tag name follows semantic versioning pattern
 * @param {string} tagName - Tag name to validate
 * @returns {boolean} True if tag follows semantic versioning
 */
function isSemanticVersion(tagName) {
  return /^v?\d+\.\d+\.\d+$/.test(tagName);
}

/**
 * Extracts major version number from a tag name
 * @param {string} tagName - Tag name (e.g., 'v1.2.3' or '1.2.3')
 * @returns {string} Major version number
 */
function extractMajorVersion(tagName) {
  return tagName.split('.')[0].replace('v', '');
}

/**
 * Calculates date that is one year before the given date
 * @param {Date|string} fromDate - Reference date
 * @returns {Date} Date one year ago
 */
function getOneYearAgo(fromDate) {
  const date = new Date(fromDate);
  date.setFullYear(date.getFullYear() - 1);
  return date;
}

/**
 * Finds compatible tags within one year of the latest release
 * @param {Array} semanticTags - Sorted semantic version tags
 * @param {Date} oneYearAgo - Cutoff date for compatibility
 * @returns {Object} Compatible tags and processed major versions
 */
function findRecentCompatibleTags(semanticTags, oneYearAgo) {
  const latestTag = semanticTags[0];
  const latestMajorVersion = extractMajorVersion(latestTag.name);
  
  const compatibleTags = [latestTag];
  const majorVersions = new Set([latestMajorVersion]);

  // Find additional compatible major versions within one year
  for (const tag of semanticTags.slice(1)) {
    const majorVersion = extractMajorVersion(tag.name);

    if (majorVersions.has(majorVersion)) continue;

    if (new Date(tag.date) >= oneYearAgo) {
      compatibleTags.push(tag);
      majorVersions.add(majorVersion);
    }
  }

  return { compatibleTags, majorVersions };
}

/**
 * Ensures minimum number of compatible tags by including older versions if needed
 * @param {Array} compatibleTags - Current compatible tags
 * @param {Set} majorVersions - Already processed major versions
 * @param {Array} semanticTags - All semantic version tags
 * @returns {Array} Enhanced compatible tags list
 */
function ensureMinimumTags(compatibleTags, majorVersions, semanticTags) {
  if (compatibleTags.length >= CONFIG.MIN_COMPATIBLE_TAGS || 
      semanticTags.length <= compatibleTags.length) {
    return compatibleTags;
  }

  const enhancedTags = [...compatibleTags];
  
  for (const tag of semanticTags) {
    const majorVersion = extractMajorVersion(tag.name);
    if (!majorVersions.has(majorVersion)) {
      enhancedTags.push(tag);
      majorVersions.add(majorVersion);
      if (enhancedTags.length === CONFIG.MIN_COMPATIBLE_TAGS) break;
    }
  }

  return enhancedTags;
}

/**
 * Creates version metadata with appropriate labels
 * @param {Array} compatibleTags - Compatible version tags
 * @param {Date} oneYearAgo - Cutoff date for deprecation
 * @returns {Array} Formatted version metadata
 */
function createVersionMetadata(compatibleTags, oneYearAgo) {
  return compatibleTags
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((tag, index) => {
      const tagDate = new Date(tag.date);

      if (index === 0) {
        return createVersionEntry("latest", `${tag.name} latest`, tag.name, tagDate);
      }
      
      if (tagDate.getTime() < oneYearAgo.getTime()) {
        return createVersionEntry(tag.name, `${tag.name} deprecated`, tag.name, tagDate);
      }

      return createVersionEntry(tag.name, tag.name, tag.name, tagDate);
    });
}

/**
 * Creates a standardized version entry object
 * @param {string} id - Version identifier
 * @param {string} name - Display name
 * @param {string} version - Version string
 * @param {Date} releaseDate - Release date
 * @returns {Object} Version entry object
 */
function createVersionEntry(id, name, version, releaseDate) {
  return { id, name, version, releaseDate };
}

/**
 * Processes and filters GitHub repository tags
 * @param {Array} tagsWithDates - List of tags with their release dates
 * @returns {Array} Curated list of compatible version tags
 */
function findComplyingTags(tagsWithDates) {
  const semanticTags = filterSemanticVersionTags(tagsWithDates);

  if (semanticTags.length === 0) {
    return [];
  }

  const latestTag = semanticTags[0];
  const oneYearAgo = getOneYearAgo(latestTag.date);

  const { compatibleTags, majorVersions } = findRecentCompatibleTags(semanticTags, oneYearAgo);
  const finalTags = ensureMinimumTags(compatibleTags, majorVersions, semanticTags);

  return createVersionMetadata(finalTags, oneYearAgo);
}

/**
 * Fetches GitHub releases with proper error handling and early termination
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {Promise<Array>} List of processed version tags
 */
async function fetchGitHubTags(owner, repo) {
  try {
    const releases = await fetchRecentReleases(owner, repo);
    
    // If we got a fallback response, return it directly
    if (releases.length > 0 && releases[0].id === "latest") {
      return releases;
    }
    
    // Process real release data
    const processedVersions = findComplyingTags(releases);
    
    // If no semantic versions found, use fallback
    if (processedVersions.length === 0) {
      console.log('No valid semantic versions found. Using fallback.');
      return createSafeFallback();
    }
    
    return processedVersions;
    
  } catch (error) {
    console.log(`GitHub API error: ${error.message}. Using fallback.`);
    return createSafeFallback();
  }
}

/**
 * Validates API response and determines if fallback is needed
 * @param {*} releases - API response data
 * @param {number} page - Current page number
 * @returns {boolean} True if fallback should be used
 */
function shouldUseFallback(releases, page) {
  if (!releases || !Array.isArray(releases)) {
    console.log('GitHub API returned non-array response. Using fallback.');
    return true;
  }
  
  if (releases.length === 0 && page === 1) {
    console.log('No releases data received. Using fallback.');
    return true;
  }
  
  return false;
}

/**
 * Determines if we have sufficient semantic versions to stop fetching
 * @param {Array} allReleases - All collected releases
 * @param {Array} currentPageReleases - Releases from current page
 * @returns {boolean} True if we should stop fetching more pages
 */
function shouldStopFetching(allReleases, currentPageReleases) {
  const semanticVersions = allReleases.filter(release => 
    isSemanticVersion(release.name)
  );
  
  return semanticVersions.length >= CONFIG.MIN_SEMANTIC_VERSIONS || 
         currentPageReleases.length === 0;
}

/**
 * Fetches recent releases from GitHub API with smart pagination
 * @param {string} owner - Repository owner  
 * @param {string} repo - Repository name
 * @returns {Promise<Array>} List of releases with basic info
 */
async function fetchRecentReleases(owner, repo) {
  let allReleases = [];
  
  for (let page = 1; page <= CONFIG.MAX_PAGES; page++) {
    try {
      const releases = await fetchSinglePage(owner, repo, page, CONFIG.PER_PAGE);
      
      if (shouldUseFallback(releases, page)) {
        return createSafeFallback();
      }
      
      allReleases = allReleases.concat(releases);
      
      if (shouldStopFetching(allReleases, releases)) {
        break;
      }
      
    } catch (error) {
      console.log(`Error fetching page ${page}: ${error.message}`);
      break; // Stop on error but return what we have
    }
  }
  
  return allReleases;
}

/**
 * Processes API response data and handles errors
 * @param {string} rawData - Raw JSON response from API
 * @returns {Array} Processed releases or empty array for fallback
 */
function processApiResponse(rawData) {
  try {
    const parsed = JSON.parse(rawData);
    
    if (parsed?.message?.includes("API rate limit exceeded")) {
      console.log('Rate limit exceeded. Using fallback.');
      return [];
    }
    
    if (parsed?.message || !Array.isArray(parsed)) {
      console.log(`API error: ${parsed?.message || 'Unknown error'}`);
      return [];
    }
    
    return parsed.map(release => ({
      name: release.tag_name,
      date: release.published_at
    }));
    
  } catch (parseError) {
    throw new Error(`Failed to parse API response: ${parseError.message}`);
  }
}

/**
 * Creates and configures HTTPS request for GitHub API
 * @param {string} endpoint - API endpoint
 * @param {Function} resolve - Promise resolve function
 * @param {Function} reject - Promise reject function
 * @returns {Object} Configured HTTPS request
 */
function createGitHubRequest(endpoint, resolve, reject) {
  const req = https.request(githubRequestOptions(endpoint), (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const releases = processApiResponse(data);
        resolve(releases);
      } catch (error) {
        reject(error);
      }
    });
  });
  
  req.on('error', (error) => {
    reject(error);
  });
  
  req.setTimeout(CONFIG.REQUEST_TIMEOUT, () => {
    req.destroy();
    reject(new Error('Request timeout'));
  });
  
  return req;
}

/**
 * Fetches a single page of releases from GitHub API
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name  
 * @param {number} page - Page number
 * @param {number} perPage - Items per page
 * @returns {Promise<Array>} Single page of releases
 */
function fetchSinglePage(owner, repo, page, perPage) {
  return new Promise((resolve, reject) => {
    const endpoint = `/repos/${owner}/${repo}/releases?per_page=${perPage}&page=${page}`;
    const req = createGitHubRequest(endpoint, resolve, reject);
    req.end();
  });
}

/**
 * Generates file paths for version download process
 * @param {string} versionedDocsFolder - Base output directory
 * @param {string} version - Version identifier
 * @returns {Object} Object containing temporary and final file paths
 */
function generateFilePaths(versionedDocsFolder, version) {
  return {
    temporary: path.join(versionedDocsFolder, `${version}-withheading.md`),
    final: path.join(versionedDocsFolder, `${version}.md`)
  };
}

/**
 * Downloads file content and saves to temporary location
 * @param {string} apiUrl - GitHub raw content URL
 * @param {string} tempPath - Temporary file path
 * @returns {Promise<void>} Promise that resolves when download completes
 */
function downloadFileContent(apiUrl, tempPath) {
  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, (res) => {
      const writeStream = fs.createWriteStream(tempPath);
      res.pipe(writeStream);

      writeStream.on('finish', () => {
        writeStream.close();
        resolve();
      });

      writeStream.on('error', reject);
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Processes downloaded file by removing first line and moving to final location
 * @param {string} tempPath - Temporary file path
 * @param {string} finalPath - Final file path
 * @returns {Promise<string>} Promise that resolves with final file path
 */
async function processDownloadedFile(tempPath, finalPath) {
  await removeFirstLine(tempPath, finalPath);
  await fsPromises.unlink(tempPath);
  return finalPath;
}

/**
 * Downloads a specific file version from GitHub
 * @param {string} apiUrl - GitHub raw content URL for file
 * @param {string} version - Version/tag of the file
 * @param {string} versionedDocsFolder - Output directory for downloaded files
 * @returns {Promise<string>} Path to downloaded file
 */
async function fetchFileForVersion(apiUrl, version, versionedDocsFolder) {
  const { temporary, final } = generateFilePaths(versionedDocsFolder, version);
  
  await downloadFileContent(apiUrl, temporary);
  return await processDownloadedFile(temporary, final);
}

/**
 * Removes the first line from a file using line-by-line processing
 * @param {string} srcPath - Source file path
 * @param {string} destPath - Destination file path
 * @returns {Promise<string>} Promise that resolves with destination path
 */
async function removeFirstLine(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const lr = new LineByLineReader(srcPath);
    const output = fs.createWriteStream(destPath);
    let isFirstLine = true;

    lr.on('error', reject);

    lr.on('line', (line) => {
      if (isFirstLine) {
        isFirstLine = false;
        return;
      }
      output.write(line + '\n');
    });

    lr.on('end', () => {
      output.end();
      resolve(destPath);
    });
  });
}

/**
 * Validates command line arguments
 * @param {Array} args - Command line arguments
 * @returns {string} Repository URL
 */
function validateArguments(args) {
  const repoUrl = args[2];
  
  if (!repoUrl) {
    console.error('Usage: node versioning.js <github-repo-url> [noversionheadings]');
    console.error('Please provide a valid GitHub repository URL');
    process.exit(1);
  }
  
  return repoUrl;
}

/**
 * Generates configuration file paths for the repository
 * @param {string} repoName - Repository name
 * @returns {Object} Configuration paths and names
 */
function generateConfigPaths(repoName) {
  const versionsFileName = repoName.replaceAll(/-/g, "");
  const versionsConfigFile = VERSIONS_CONFIG_TEMPLATE[versionsFileName] || versionsFileName;
  const versionsConfigFilePath = `./config/dictionaries/${versionsConfigFile}.json`;
  const versionedDocsFolder = path.join(__dirname, `../shared/${repoName}-versions`);
  
  return {
    versionsFileName,
    versionsConfigFile,
    versionsConfigFilePath,
    versionedDocsFolder
  };
}

/**
 * Sets up the output directory for versioned documentation
 * @param {string} versionedDocsFolder - Path to versioned docs folder
 * @returns {Promise<void>} Promise that resolves when setup is complete
 */
async function setupOutputDirectory(versionedDocsFolder) {
  if (fs.existsSync(versionedDocsFolder)) {
    await fsPromises.rm(versionedDocsFolder, { recursive: true });
  }
  await fsPromises.mkdir(versionedDocsFolder, { recursive: true });
}

/**
 * Creates minimal fallback content when documentation download fails
 * @param {string} outputPath - Output file path
 * @param {string} owner - Repository owner
 * @param {string} repoName - Repository name
 * @returns {Promise<void>} Promise that resolves when file is created
 */
async function createMinimalFallback(outputPath, owner, repoName) {
  const content = `# Documentation\n\nPlease check the [${owner}/${repoName} repository](https://github.com/${owner}/${repoName}) for the latest documentation.\n`;
  await fsPromises.writeFile(outputPath, content);
  console.log(`Created minimal fallback file`);
}

/**
 * Downloads documentation for a fallback version (latest from master)
 * @param {Object} tagVersion - Version metadata
 * @param {string} owner - Repository owner
 * @param {string} repoName - Repository name
 * @param {string} filepath - Documentation file path
 * @param {string} versionedDocsFolder - Output directory
 * @returns {Promise<void>} Promise that resolves when download completes
 */
async function downloadFallbackVersion(tagVersion, owner, repoName, filepath, versionedDocsFolder) {
  console.log(`Fetching actual latest documentation for fallback version: ${tagVersion.id}`);
  
  try {
    const latestUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/master/${filepath}`;
    await fetchFileForVersion(latestUrl, tagVersion.id, versionedDocsFolder);
    console.log(`✓ Downloaded latest docs from master branch`);
  } catch (latestError) {
    console.log(`⚠ Failed to download latest docs: ${latestError.message}`);
    const outputPath = path.join(versionedDocsFolder, `${tagVersion.id}.md`);
    await createMinimalFallback(outputPath, owner, repoName);
  }
}

/**
 * Downloads documentation for a specific tagged version
 * @param {Object} tagVersion - Version metadata
 * @param {string} owner - Repository owner
 * @param {string} repoName - Repository name
 * @param {string} filepath - Documentation file path
 * @param {string} versionedDocsFolder - Output directory
 * @returns {Promise<void>} Promise that resolves when download completes
 */
async function downloadTaggedVersion(tagVersion, owner, repoName, filepath, versionedDocsFolder) {
  try {
    const downloadUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/refs/tags/${tagVersion.version}/${filepath}`;
    await fetchFileForVersion(downloadUrl, tagVersion.id, versionedDocsFolder);
    console.log(`✓ Downloaded: ${tagVersion.version}`);
  } catch (downloadError) {
    console.log(`⚠ Failed to download ${tagVersion.version}: ${downloadError.message} - skipping`);
  }
}

/**
 * Downloads documentation files for all versions
 * @param {Array} tagVersions - List of version metadata
 * @param {string} owner - Repository owner
 * @param {string} repoName - Repository name
 * @param {string} filepath - Documentation file path
 * @param {string} versionedDocsFolder - Output directory
 * @returns {Promise<void>} Promise that resolves when all downloads complete
 */
async function downloadVersionDocumentation(tagVersions, owner, repoName, filepath, versionedDocsFolder) {
  console.log(`Downloading documentation for ${tagVersions.length} versions...`);
  
  for (const tagVersion of tagVersions) {
    const isFallbackVersion = tagVersion.version === "latest" && tagVersion.id === "latest";
    
    if (isFallbackVersion) {
      await downloadFallbackVersion(tagVersion, owner, repoName, filepath, versionedDocsFolder);
    } else {
      await downloadTaggedVersion(tagVersion, owner, repoName, filepath, versionedDocsFolder);
    }
  }
}

/**
 * Main script execution function
 * Fetches and versions documentation for a GitHub repository
 */
async function main() {
  try {
    // Validate input and parse repository details
    const repoUrl = validateArguments(process.argv);
    const { owner, name: repoName, filepath } = parseGithubUrl(repoUrl);
    
    // Generate configuration paths
    const { versionsConfigFilePath, versionedDocsFolder } = generateConfigPaths(repoName);
    
    console.log(`Started versioning ${repoName} docs`);

    // Fetch and process repository versions
    const tagVersions = await fetchGitHubTags(owner, repoName);
    console.log(`Found ${tagVersions.length} versions to process`);

    // Write versions configuration and setup output directory
    await fsPromises.writeFile(versionsConfigFilePath, JSON.stringify(tagVersions, null, 2));
    await setupOutputDirectory(versionedDocsFolder);

    // Download documentation for each version
    await downloadVersionDocumentation(tagVersions, owner, repoName, filepath, versionedDocsFolder);
    
    console.log(`Versioned ${repoName} docs successfully`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();