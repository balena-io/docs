#!/usr/bin/env node

const { writeFile, readFile, readdir, unlink } = require('fs/promises');
const path = require('path');
const { getSdk } = require('balena-sdk')
const Handlebars = require('handlebars');

const LANGUAGES = require('../config/dictionaries/language.json');

const CLI_LATEST_VERSION_URL = 'https://api.github.com/repos/balena-io/balena-cli/releases/latest';
const DEVICE_IMG_URL = '/img/device/';
const DEVICE_IMG_PATH = '../pages/.gitbook/assets/';
const GUIDE_TEMPLATE_FILE_PATH = '../templates/getting-started.md';
const WHAT_YOU_NEED_TEMPLATE_PATH = '../templates/whatYouNeed/';
const DEVICE_LIST_TEMPLATE_PATH = '../templates/device-list.md';
const SUMMARY_FILE_PATH = '../summary/SUMMARY.md';
const GUIDES_DEST_FOLDER = '../getting-started/';
const DEVICE_LIST_DEST_FOLDER = '../pages/reference/hardware/';

const
  balena = getSdk({
    apiUrl: 'https://api.balena-cloud.com/',
    dataDirectory: '/opt/local/balena',
  });

const baseType = {
  'png': 'png',
  'jpg': 'jpg',
  'jpeg': 'jpg',
  'svg+xml': 'svg',
  'svg': 'svg',
};

/**
 * Code modified from https://github.com/douzi8/base64-img/blob/master/base64-img.js
 */
function img(data) {
  const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
  const match = data.match(reg);

  if (!match) {
    throw new Error('image base64 data error');
  }

  const extname = baseType[match[1]] ? baseType[match[1]] : match[1];

  return {
    extname: '.' + extname,
    base64: match[2],
  };
}

/**
 * Using Data URI for SVG in base64 encoding lead to one of the components in stack stripping/
 * sanitizing the deviceType logos when testing locally. It's yet to be investigated as to why
 * the `src` tag was being stripped when testing locally but till then using this method to
 * convert base64 Data URI to SVG which is not ideal
 *
 * @param {*} data
 * @param {*} name
 * @returns
 */
const svgCreator = async function (data, name) {
  const result = img(data);
  const filePathContract = path.join(DEVICE_IMG_URL, name + result.extname);
  const filePathActual = path.join(__dirname, DEVICE_IMG_PATH + 'dt-' + name + result.extname);

  await writeFile(filePathActual, result.base64, { encoding: 'base64' });

  // return path of the image for the contracts
  return filePathContract
};

const etcherLinkInstruction = `[Etcher](https://www.etcher.io/)`
const sdCardInstruction = `Insert the freshly flashed sdcard into`

/**
 * Adds gifs and screenshots where needed in the provisioning instructions.
 * Converting to markdown first because the markdown converter unintentially escapes characters
 * in existing markdown tags which lead to broken markdown
 *
 * @param {*} instructions
 * @returns
 */
function prepareInstructions(instructions) {
  // Convert HTML to markdown 
  // Create a markdown list of all instructions
  // trying to bypass node-html- as gitbook should be able to interpret html
  // instructions = instructions.map(instruction => `- ${NodeHtmlMarkdown.translate(instruction)}`)

  // Add etcher flashing GIF to instructions
  const etcherIndex = instructions.findIndex((instruction) => instruction.includes(etcherLinkInstruction))
  // findIndex returns -1 as output when the element can't be found 
  if (etcherIndex !== -1) {
    instructions.splice(etcherIndex + 1, 0, `![etcher flashing](/img/common/etcher/etcher.gif)`)
  }

  // Add SD card GIF to instructions
  const sdCardIndex = instructions.findIndex((instruction) => instruction.includes(sdCardInstruction))
  if (sdCardIndex !== -1) {
    instructions.splice(sdCardIndex + 1, 0, `![insert SD card](/img/gifs/insert-sd.gif)`)
  }

  return instructions
}

/**
 *
 * Creates a device type contracts specifically to be used for Docs at build time
 * These contracts are used to populate dropdown present in
 */
async function supportedDeviceTypeContract() {
  const contracts = await balena.models.deviceType.getAllSupported({
    $select: [
      'contract',
      'logo',
    ],
  })

  console.log('Generating Getting Started Guides...')
  return await Promise.all(contracts.map(async (contract) => ({
      id: contract.contract.slug,
      name: contract.contract.name,
      arch: contract.contract.data.arch,
      // bootMedia: bootMediaDecider(contract.contract.data.media, contract.contract.data.flashProtocol),
      icon: await svgCreator(contract.logo, contract.contract.slug),
      // icon: base64Decorder(contract.logo),
      instructions: prepareInstructions(await balena.models.deviceType.getInstructions(contract.contract.slug)),
    }),
  ))
}

const getLatestCLIVersion = async () => {
  try {
    const response = await fetch(CLI_LATEST_VERSION_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result['tag_name'];
  } catch (error) {
    console.error(error.message);
  }
};

const emptyDirectory = async () => {
  for (const file of await readdir(path.join(__dirname, GUIDES_DEST_FOLDER))) {
    await unlink(path.join(path.join(__dirname, GUIDES_DEST_FOLDER), file));
  }
};


const updateGettingStartedSectionInSummary = async (deviceTypes) => {
  const content = await readFile(path.join(__dirname, SUMMARY_FILE_PATH), 'utf8');
  const lines = content.split('\n');

  // 1. Find the index of the target item
  const startIndex = lines.findIndex(line => line.trim().startsWith('* [Getting Started]'));

  if (startIndex === -1) {
    console.error('Could not find the \'getting-started\' section.');
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
  const tmpl = `${indent}* [Getting Started](getting-started/README.md "Getting Started")\n` +
    `${deviceTypes.map((dt) => `${indent}  * [Getting Started with ${dt.name}](getting-started/${dt.id}.md "${dt.name}")`).join(`\n`)}`;

  // 5. Replace the old range with the new template
  lines.splice(startIndex, endIndex - startIndex, tmpl);

  const updatedContent = lines.join('\n');
  writeFile(path.join(__dirname, SUMMARY_FILE_PATH), updatedContent, 'utf8');

  console.log('SUMMARY.md updated successfully!');
}

const generateDeviceListPage = async (deviceTypes) => {
  const tmpl = await readFile(path.join(__dirname, DEVICE_LIST_TEMPLATE_PATH));
  const template = Handlebars.compile(tmpl.toString());
  const compiledTemplate = template({
    deviceTypes,
  });
  await writeFile(path.join(__dirname, DEVICE_LIST_DEST_FOLDER, 'devices.md'), compiledTemplate);
  console.log('Generated Device list at ', DEVICE_LIST_DEST_FOLDER, 'devices.md');
}

/**
 * This is where the script starts
 */
(async () => {

  const deviceTypes = await supportedDeviceTypeContract();

  const tmpl = await readFile(path.join(__dirname, GUIDE_TEMPLATE_FILE_PATH));

  await emptyDirectory();

  const template = Handlebars.compile(tmpl.toString());

  const latestCLIVersion = await getLatestCLIVersion();

  await Promise.all(
    deviceTypes.map(async (deviceType) => {
      let whatYouNeedSection;
      try {
        const whatYouNeedMdFile = await readFile(path.join(__dirname, WHAT_YOU_NEED_TEMPLATE_PATH, `${deviceType['id']}.md`));
        const whatYouNeedTemplate = Handlebars.compile(whatYouNeedMdFile.toString());
        whatYouNeedSection = whatYouNeedTemplate({
          $device: deviceType,
        });
      } catch (e) {
        // not all devices have specific "what you'll need" sections, in that case the template falls back to default content
      }

      const compiledTemplate = template({
        $languages: LANGUAGES,
        $device: deviceType,
        $latestCLIVersion: latestCLIVersion,
        $whatYouNeed: whatYouNeedSection,
      });
      await writeFile(path.join(__dirname, GUIDES_DEST_FOLDER, `${deviceType['id']}.md`), compiledTemplate);
    }),
  );

  await updateGettingStartedSectionInSummary(deviceTypes);
  
  await generateDeviceListPage(deviceTypes);
})();