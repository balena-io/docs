#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const parseGithubUrl = require('./github-parser');
const LineByLineReader = require('line-by-line');

// Retrieve GitHub API token from environment variable (optional)
const githubToken = process.env.GITHUB_TOKEN || null;
if (!githubToken) {
  console.log('WARNING: GITHUB_TOKEN not provided in the environment. Versioning scripts might get rate-limited.');
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
 * Processes and filters GitHub repository tags
 * @param {Array} tagsWithDates - List of tags with their release dates
 * @returns {Array} Curated list of compatible version tags
 */
function findComplyingTags(tagsWithDates) {
  // Filter semantic version tags (e.g., v1.2.3 or 1.2.3)
  const semanticTags = tagsWithDates
    .filter(tag => /^v?\d+\.\d+\.\d+$/.test(tag.name))
    .sort((a, b) => {
      // Sort tags by release date in descending order
      return b.date - a.date;
    });

  // Return empty array if no semantic tags found
  if (semanticTags.length === 0) {
    return [];
  }

  // Identify the latest major version
  const latestMajorVersion = semanticTags[0].name.split('.')[0].replace('v', '');
  const latestMajorTag = semanticTags[0];

  // Calculate the one-year cutoff date
  const oneYearAgo = new Date(latestMajorTag.date);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Initialize compatible tags with the latest major version
  const compatibleTags = [latestMajorTag];
  const majorVersions = new Set([latestMajorVersion]);

  // Find additional compatible major versions within one year
  for (const tag of semanticTags.slice(1)) {
    const majorVersion = tag.name.split('.')[0].replace('v', '');

    // Skip already processed major versions
    if (majorVersions.has(majorVersion)) continue;

    // Include tags within one year of the latest major version
    if (tag.date >= oneYearAgo) {
      compatibleTags.push(tag);
      majorVersions.add(majorVersion);
    }
  }

  // Ensure at least 5 tags are included if possible
  if (compatibleTags.length < 5 && semanticTags.length > compatibleTags.length) {
    for (const tag of semanticTags) {
      const majorVersion = tag.name.split('.')[0].replace('v', '');
      if (!majorVersions.has(majorVersion)) {
        compatibleTags.push(tag);
        majorVersions.add(majorVersion);
        if (compatibleTags.length === 5) break;
      }
    }
  }

  // Sort compatible tags by date
  compatibleTags.sort((a, b) => b.date - a.date);

  // Create final tagged list with additional metadata
  const result = compatibleTags.map((tag, index) => {
    let tagDate = new Date(tag.date)

    // Mark first tag as latest
    if (index === 0) {
      return { id: "latest", name: `${tag.name} latest`, version: tag.name, releaseDate: tagDate };
    }
    // Mark older tags as deprecated
    else if (tagDate < oneYearAgo) {
      return { id: tag.name, name: `${tag.name} deprecated`, version: tag.name, releaseDate: tagDate };
    }

    return { id: tag.name, name: tag.name, version: tag.name, releaseDate: tagDate };
  });

  return result;
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
 * Fetches recent releases from GitHub API with smart pagination
 * @param {string} owner - Repository owner  
 * @param {string} repo - Repository name
 * @returns {Promise<Array>} List of releases with basic info
 */
async function fetchRecentReleases(owner, repo) {
  const maxPages = 5; // 500 releases, well under GitHub's 1000 releases limit
  const perPage = 100;  // Reasonable batch size
  let allReleases = [];
  
  for (let page = 1; page <= maxPages; page++) {
    try {
      const releases = await fetchSinglePage(owner, repo, page, perPage);
      
      // Handle API errors
      if (!releases || !Array.isArray(releases)) {
        console.log('GitHub API returned non-array response. Using fallback.');
        return createSafeFallback();
      }
      
      // Handle empty response (rate limit or error case)
      if (releases.length === 0 && page === 1) {
        console.log('No releases data received. Using fallback.');
        return createSafeFallback();
      }
      
      // Add releases to our collection
      allReleases = allReleases.concat(releases);
      
      // Early exit if we have enough semantic versions
      const semanticVersions = allReleases.filter(release => 
        /^v?\d+\.\d+\.\d+$/.test(release.name)
      );
      
      if (semanticVersions.length >= 10 || releases.length === 0) {
        break; // We have enough or no more data
      }
      
    } catch (error) {
      console.log(`Error fetching page ${page}: ${error.message}`);
      break; // Stop on error but return what we have
    }
  }
  
  return allReleases;
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
    const req = https.request(githubRequestOptions(endpoint), (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          
          // Handle rate limiting
          if (parsed?.message?.includes("API rate limit exceeded")) {
            console.log('Rate limit exceeded. Using fallback.');
            resolve([]); // Return empty array to trigger fallback
            return;
          }
          
          // Handle other API errors
          if (parsed?.message || !Array.isArray(parsed)) {
            console.log(`API error: ${parsed?.message || 'Unknown error'}`);
            resolve([]); // Return empty array to trigger fallback
            return;
          }
          
          // Convert to our format
          const releases = parsed.map(release => ({
            name: release.tag_name,
            date: release.published_at
          }));
          
          resolve(releases);
          
        } catch (parseError) {
          reject(new Error(`Failed to parse API response: ${parseError.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Downloads a specific file version from GitHub
 * @param {string} apiUrl - GitHub API endpoint for file
 * @param {string} version - Version/tag of the file
 * @param {string} versionedDocsFolder - Output directory for downloaded files
 * @returns {Promise<string>} Path to downloaded file
 */
async function fetchFileForVersion(apiUrl, version, versionedDocsFolder) {
  return new Promise((resolve, reject) => {
    const req = https.request(apiUrl, (res) => {
      // Ensure output directory exists
      const outputPathWithHeading = path.join(versionedDocsFolder, `${version}-withheading.md`);

      // Create write stream
      const writeStream = fs.createWriteStream(outputPathWithHeading);

      res.pipe(writeStream);

      writeStream.on('finish', async () => {
        writeStream.close();
        const outputPath = path.join(versionedDocsFolder, `${version}.md`);
        await removeFirstLine(outputPathWithHeading, outputPath)
        await fsPromises.unlink(outputPathWithHeading);
        resolve(outputPath);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

      req.end();
  });
}

// Function to remove first line from a file
async function removeFirstLine(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    const lr = new LineByLineReader(srcPath);
    const output = fs.createWriteStream(destPath);
    let isFirstLine = true;

    lr.on('error', (err) => {
      reject(err);
    });

    lr.on('line', (line) => {
      // Skip the first line
      if (isFirstLine) {
        isFirstLine = false;
        return;
      }

      // Write subsequent lines to the output file
      output.write(line + '\n');
    });

    lr.on('end', () => {
      output.end();
      resolve(destPath);
    });
  });
}

/**
 * Main script execution function
 * Fetches and versions documentation for a GitHub repository
 * Add versionheadings flag to add version headings to docs
 */
async function main() {
  // Retrieve GitHub repository URL from command line argument
  const repoUrl = process.argv[2];

  // Validate repository URL input
  if (!repoUrl) {
    console.error('Usage: node versioning.js <github-repo-url> [noversionheadings]');
    console.error('Please provide a valid GitHub repository URL');
    process.exit(1);
  }

  const versionsConfigFileTemplate = {
    "balenasdk": "nodesdk",
    "balenasdkpython": "pythonsdk",
  }

  // Parse repository details
  const { owner, name: repoName, filepath } = parseGithubUrl(repoUrl);

  // Create versioned config file - Doxx doesn't allow dashes in the config file name
  const versionsFileName = repoName.replaceAll(/-/g, "")
  // Doxx treats config files with common names as same, so balenasdk and balenasdkpython config files needs to be named differently
  const versionsConfigFile = versionsConfigFileTemplate[versionsFileName] ? versionsConfigFileTemplate[versionsFileName] : versionsFileName
  const versionsConfigFilePath = `./config/dictionaries/${versionsConfigFile}.json`
  
  const versionedDocsFolder = path.join(__dirname, `../shared/${repoName}-versions`)
  
  console.log(`Started versioning ${repoName} docs`)

  try {
    // Fetch and process repository versions (always succeeds with fallback)
    const tagVersions = await fetchGitHubTags(owner, repoName);
    console.log(`Found ${tagVersions.length} versions to process`);

    // Write versions configuration (always valid JSON)
    await fsPromises.writeFile(versionsConfigFilePath, JSON.stringify(tagVersions, null, 2));
    if (fs.existsSync(versionedDocsFolder)) {
      await fsPromises.rm(versionedDocsFolder, { recursive: true });
    }
    await fsPromises.mkdir(versionedDocsFolder, { recursive: true });

    // Download documentation for each version
    console.log(`Downloading documentation for ${tagVersions.length} versions...`);
    
    for (const tagVersion of tagVersions) {
      // Skip fallback versions - no need to create files for them
      if (tagVersion.version === "latest" && tagVersion.id === "latest") {
        console.log(`Skipping fallback version: ${tagVersion.id}`);
        continue;
      }
      
      // Try to download real version documentation
      try {
        const downloadUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/refs/tags/${tagVersion.version}/${filepath}`;
        await fetchFileForVersion(downloadUrl, tagVersion.id, versionedDocsFolder);
        console.log(`✓ Downloaded: ${tagVersion.version}`);
        
      } catch (downloadError) {
        console.log(`⚠ Failed to download ${tagVersion.version}: ${downloadError.message} - skipping`);
        // Skip this version - the dictionary data is sufficient
      }
    }
    console.log(`Versioned ${repoName} docs successfully`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();