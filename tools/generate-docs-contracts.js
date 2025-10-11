const { getSdk } = require('balena-sdk')
const { writeFile, access, constants } = require('fs/promises')
const path = require('path')
const { NodeHtmlMarkdown } = require('node-html-markdown')

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: "/opt/local/balena"
});


/**
 * Wrote logic to accurately output the default bootMedia being used by the device type as 
 * provided by the instructions mentioned in contracts README. 
 * 
 * After cleaning up the partials, chose to not use the following code since there wasn no need 
 * for it. 
 * 
 * @param {*} media 
 * @param {*} flashProtocol 
 * @returns 
 */
// function bootMediaDecider(media, flashProtocol) {
//   if (media.defaultBoot === "sdcard") {
//     return "SD card"
//   }
//   if (media.defaultBoot === "image") {
//     return "image"
//   }
//   else if (media.defaultBoot === "internal") {
//     if (media.altBoot === undefined) {
//       if (flashProtocol === "jetsonFlash" || flashProtocol === "RPIBOOT") {
//         return "eMMC"
//       }
//     } else {
//       if (media.altBoot.length === 1 && media.altBoot[0] === "sdcard") {
//         return "SD Card"
//       }
//       else if (media.altBoot.length === 1 && media.altBoot[0] === "usb_mass_storage") {
//         return "USB key"
//       } else if (media.altBoot.includes('usb_mass_storage'))
//         return "USB Key"
//     }
//   }
// }

const baseType = {
  'png': 'png', 
  'jpg': 'jpg',
  'jpeg': 'jpg',
  'svg+xml': 'svg',
  'svg': 'svg'
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
    base64: match[2]
  };
}

/**
 * 
 * Using Data URI for SVG in base64 encoding lead to one of the components in stack stripping/
 * sanitizing the deviceType logos when testing locally. It's yet to be investigated as to why
 * the `src` tag was being stripped when testing locally but till then using this method to 
 * convert base64 Data URI to SVG which is not ideal
 * 
 * @param {*} data 
 * @param {*} destpath 
 * @param {*} name 
 * @returns 
 */
const svgCreator = async function (data, destpath, name) {
  const result = img(data);
  const filePathContract = path.join(destpath, name + result.extname);
  const filePathActual = path.join(__dirname, '../static' + destpath + name + result.extname);
  try {
    // Check if the image already exists (caveat, doesn't update the image)
    await access(filePathActual, constants.F_OK)
  } catch (e) {
    // If it doesn't exist then create the image
    await writeFile(filePathActual, result.base64, { encoding: 'base64' });
  }
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
  instructions = instructions.map(instruction => `- ${NodeHtmlMarkdown.translate(instruction)}`)

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
      'logo'
    ]
  })

  console.log("Generating docs specific contracts from scratch ... this will take a moment.")
  return await Promise.all(contracts.map(async (contract) => ({
    id: contract.contract.slug,
    name: contract.contract.name,
    arch: contract.contract.data.arch,
    // bootMedia: bootMediaDecider(contract.contract.data.media, contract.contract.data.flashProtocol),
    icon: await svgCreator(contract.logo, '/img/device/', contract.contract.slug),
    // icon: base64Decorder(contract.logo),
    instructions: prepareInstructions(await balena.models.deviceType.getInstructions(contract.contract.slug))
  })
  ))
}

/**
 * This is where the script starts
 */
(async () => {
  const docsContracts = await supportedDeviceTypeContract()
  await writeFile(path.join(__dirname, '../config/dictionaries/device.json'), JSON.stringify(docsContracts))
})()
