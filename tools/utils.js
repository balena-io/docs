const { writeFile, readFile } = require('fs/promises');
const path = require('path');

const SUMMARY_FILE_PATH = '../pages/SUMMARY.md';

/**
 * Find an item in the SUMMARY.md file and update it along with its children 
 *
 * @param items
 * @param sectionTitle
 * @param sectionPathWithoutTrailingSlash
 * @param pageTitle (deviceTypeName: string) => string
 * @returns {Promise<void>}
 */
const updateSummaryFile = async (items, sectionTitle, sectionPathWithoutTrailingSlash, pageTitle) => {
  const summaryFileContent = await readFile(path.join(__dirname, SUMMARY_FILE_PATH), 'utf8');
  const lines = summaryFileContent.split('\n');

  // 1. Find the index of the target item
  const startIndex = lines.findIndex(line => line.trim().startsWith(`* [${sectionTitle}]`));

  if (startIndex === -1) {
    console.error(`Could not find the ${sectionTitle} section in SUMMARY.md.`);
    return;
  }

  // 2. Identify the indentation level of the parent
  const parentIndent = lines[startIndex].match(/^\s*/)[0].length;

  // 3. Find where the sub-items end
  let endIndex = startIndex + 1;
  while (endIndex < lines.length) {
    const line = lines[endIndex];

    // Skip empty lines
    if (line.trim() === '') {
      endIndex++;
      continue;
    }

    const currentIndent = line.match(/^\s*/)[0].length;

    // If we find a line with the same or less indentation, we've exited the sub-tree
    if (currentIndent <= parentIndent) {
      break;
    }
    endIndex++;
  }

  // 4. Generate new content
  const indent = ' '.repeat(parentIndent);
  const tmpl = `${indent}* [${sectionTitle}](${sectionPathWithoutTrailingSlash}/README.md "${sectionTitle}")\n` +
    `${items.map((item) => `${indent}  * [${pageTitle(item.name)}](${sectionPathWithoutTrailingSlash}/${item.id}.md "${item.name}")`).join(`\n`)}`;

  // 5. Replace the old range with the new template
  lines.splice(startIndex, endIndex - startIndex, tmpl);

  const updatedContent = lines.join('\n');
  await writeFile(path.join(__dirname, SUMMARY_FILE_PATH), updatedContent, 'utf8');

  console.log(`✅ Updated ${sectionTitle} Section in ${SUMMARY_FILE_PATH}`);
}

module.exports = {
  updateSummaryFile,
}