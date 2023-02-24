const { getSdk } = require('balena-sdk')
const { writeFile } = require('node:fs/promises')
const path = require('path')
const { NodeHtmlMarkdown } = require('node-html-markdown')

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: "/opt/local/balena"
});

// function img(data) {
//   var reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
//   var match = data.match(reg);
//   var baseType = {
//     jpeg: 'jpg'
//   };

//   baseType['svg+xml'] = 'svg'

//   if (!match) {
//     throw new Error('image base64 data error');
//   }

//   var extname = baseType[match[1]] ? baseType[match[1]] : match[1];

//   return {
//     extname: '.' + extname,
//     base64: match[2]
//   };
// }

// const imgSync = function(data, destpath, name) {
//   var result = img(data);
//   var filepath = path.join(destpath, name + result.extname);

//   fs.writeFileSync(filepath, result.base64, { encoding: 'base64' });
//   return filepath;
// };

async function bro() {
  let deviceType = []
  const contracts = await balena.models.deviceType.getAllSupported({
    $select: [
      'contract',
      'logo'
    ]
  })

  function bootMediaDecider(media, flashProtocol) {
    if (media.defaultBoot === "sdcard") {
      return "SD card"
    }
    if (media.defaultBoot === "image") {
      return "image"
    }
    else if (media.defaultBoot === "internal") {
      if (media.altBoot === undefined) {
        if (flashProtocol === "jetsonFlash" || flashProtocol === "RPIBOOT") {
          return "eMMC"
        }
      } else {
        if (media.altBoot.length === 1 && media.altBoot[0] === "sdcard") {
          return "SD Card"
        }
        else if (media.altBoot.length === 1 && media.altBoot[0] === "usb_mass_storage") {
          return "USB key"
        } else if (media.altBoot.includes('usb_mass_storage'))
          return "USB Key"
      }
    }
  }

  // function base64Decorder(dataUrl) {
  //   const buffer = new Buffer.from(dataUrl.split(",")[1], 'base64')
  //   // const d
  // }
  const etcherLinkInstruction = `[Etcher](http://www.etcher.io/)`
  const sdCardInstruction = `Insert the freshly flashed sdcard into`

  function instructionPrep(instructions) {
    // Converting to markdown first because the markdown converter unintentially escapes characters
    // in existing markdown tags which lead to broken markdown
    instructions = instructions.map(instruction => NodeHtmlMarkdown.translate(instruction))
    const etcherIndex = instructions.findIndex((instruction) => instruction.includes(etcherLinkInstruction))
    // findIndex returns -1 as output when the element can't be found 
    if (etcherIndex != -1) {
      instructions.splice(etcherIndex + 1, 0, `![etcher flashing](/img/common/etcher/etcher.gif)`)
    }

    const sdCardIndex = instructions.findIndex((instruction) => instruction.includes(sdCardInstruction))
    if (sdCardIndex != -1) {
      instructions.splice(sdCardIndex + 1, 0, `![insert SD card](/img/gifs/insert-sd.gif)`)
    }

    return instructions
  }
  

  for (const contract of contracts) {
    deviceType = [
      ...deviceType,
      {
        id: contract.contract.slug,
        name: contract.contract.name,
        arch: contract.contract.data.arch,
        // bootMedia: bootMediaDecider(contract.contract.data.media, contract.contract.data.flashProtocol),
        // icon: base64Decorder(contract.logo),
        icon: contract.logo,
        // icon: imgSync(contract.logo, path.resolve(__dirname, './static/img/device/'), contract.contract.slug),
        // instructions: await balena.models.deviceType.getInstructions(contract.contract.slug)
        instructions: instructionPrep(await balena.models.deviceType.getInstructions(contract.contract.slug))
      }
    ]
  }

  await writeFile(path.resolve(__dirname, './config/dictionaries/device.json'), JSON.stringify(deviceType))
}

bro()