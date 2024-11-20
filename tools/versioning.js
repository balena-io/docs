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
 * Fetches all release tags from a GitHub repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @returns {Promise<Array>} List of processed version tags
 */
async function fetchGitHubTags(owner, repo) {
  // Recursive function to handle GitHub API pagination
  async function fetchAllTagsWithDates(page = 1, allTags = []) {
    return new Promise((resolve, reject) => {
      const req = https.request(githubRequestOptions(`/repos/${owner}/${repo}/releases?per_page=100&page=${page}`), (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const tags = JSON.parse(data);
            // Handle API rate limit errors
            if (tags?.message?.includes("API rate limit exceeded")) {
              throw new Error(`GitHub API Rate Limit exceeded, please authenticate ${tags.message}`)
            }

            // Extract tag details
            const tagsWithDetails = tags.map(tag => ({
              name: tag.name,
              date: tag.published_at
            }));

            // Check for additional pages
            const linkHeader = res.headers.link;
            if (linkHeader && linkHeader.includes('rel="next"')) {
              resolve(fetchAllTagsWithDates(page + 1, [...allTags, ...tagsWithDetails]));
            } else {
              resolve([...allTags, ...tagsWithDetails]);
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  return findComplyingTags(await fetchAllTagsWithDates())
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

  // Parse repository details
  const { owner, name: repoName, filepath } = parseGithubUrl(repoUrl);
  const versionsConfigFile = `./config/dictionaries/${repoName.replaceAll(/-/g, "")}.json`
  const versionedDocsFolder = path.join(__dirname, `../shared/${repoName}-versions`)
  
  console.log(`Started versioning ${repoName} docs`)

  try {
    // Fetch and process repository versions
    const tagVersions = await fetchGitHubTags(owner, repoName);

    // Write versions configuration
    await fsPromises.writeFile(versionsConfigFile, JSON.stringify(tagVersions, null, 2));
    if (fs.existsSync(versionedDocsFolder)) {
      await fsPromises.rm(versionedDocsFolder, { recursive: true });
    }
    await fsPromises.mkdir(versionedDocsFolder, { recursive: true });

    // Download documentation for each version
    for (const tagVersion of tagVersions) {
      await fetchFileForVersion(
        `https://raw.githubusercontent.com/${owner}/${repoName}/refs/tags/${tagVersion.version}/${filepath}`,
        tagVersion.id,
        versionedDocsFolder,
      );
    }
    console.log(`Versioned ${repoName} docs successfully`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Execute the main function
main();