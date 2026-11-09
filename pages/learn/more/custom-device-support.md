# Custom Device Support

### Overview

For a device to be compatible with the balenaCloud platform, it needs to run balenaOS, our minimal Linux distribution built with Yocto and designed to run containers.

Balena supports a wide range of Linux SBCs and SOMs, but occasionally our list of supported devices will not include the device you would like to use. In order to allow our customers to have the freedom to use their preferred hardware with balena, we offer our Custom Device Support (CDS) service. The SBC families we currently support are x86, Nvidia, Pi, and NXP.

To support this process, we’ve trained several Integration Partners on how to bring compatibility for balenaOS to custom hardware. The result will be a custom version of balenaOS specifically for your hardware. We will periodically build, test, and release upgrades to the device OS in order to keep it up to date with [meta-balena](https://github.com/balena-os/meta-balena) - you can read more about that process and why it’s so important [here](https://blog.balena.io/from-pr-to-release-os-testing-at-balena/). Your custom device type and its associated custom device OS will then be available to download in the balenaCloud dashboard. The outcome of CDS is a production-grade custom version of balenaOS built for your Linux device of choice, with ongoing support including test-and-release of upgraded OS versions.

The following is what's included with custom device support work:

* Initial development: Build and test a custom balenaOS image for your device type, including automated testing.
* Ongoing upgrades: We will periodically upgrade your device type’s host OS to incorporate new features, security patches, bug fixes, kernel upgrades, vendor-provided BSP updates, etc. If this hardware is custom designed for you, we may require that you or your manufacturer send us these updates.
* Ongoing tests: We will test every new version of balenaOS on your exact device in our testing rig.
* Ongoing releases: We will release every new version of the host OS so that it’s available for download via the balenaCloud dashboard.
* Troubleshooting: Our device support team will assist you with questions, issues, or feature requests you have for your device’s OS.

### Description of Work

#### Step 1: Evaluation and Estimated Quote

To provide a high-level evaluation of the work our Integration Partners will need to do to enable compatibility, we require as much information as you can share with us about the hardware, including:

* Link to the manufacturer’s website
* Any software or hardware manuals they’ve shared
* A link to their BSP, overlays, drivers, etc.

We will share this information with an Integration Partner who would be the best match based on experience with your SoC/SoM and availability. They will provide you an estimate for the number of hours of work anticipated and the associated cost.

Note that the hours and costs are estimates - once engineers have time hands-on with hardware, they often find complexities they couldn’t foresee when looking only at vendor documentation. In our experience, most projects cost between $10,000-$15,000, but your specific project could be outside that range.

#### Step 2: Shipping Hardware

If you accept the quote provided by our Integration Partner, your next step will be to ship hardware. You will need to send hardware to BOTH the Partner and to Balena. This is because we need access to hardware to help with questions the Partner may have, and to put the device into an [AutoKit](https://blog.balena.io/from-pr-to-release-os-testing-at-balena/). You will need to send this items to both the Integration Partner and Balena:

* A power supply
* Your custom hardware
* Any necessary peripherals
* Any necessary cables

At the end of the integration project, the Partner will send you the set they’ve used back to you. Balena will keep our set for our automated OS testing throughout the time you use the hardware on balenaCloud.

#### Step 3: Development

Once your hardware is received, our Integration Partner will begin the work of creating a production-grade, custom version of balenaOS, built specifically for your chosen hardware. We will require a technical point of contact from your team to ensure we can ask questions of you or your manufacturer throughout the process. Your Balena Customer Success representative will help with project coordination.

#### Step 4: Ongoing Maintenance

Once an OS for a custom device type is available in the production dashboard, balena will be providing ongoing support as part of the maintenance phase. This includes updates to the custom device type in the case of hardware changes, support for device type specific questions in our support queue, as well as test-and-release of upgraded balenaOS versions.

Balena will now begin charging $2,000 per month for ongoing support. The fee is required to maintain support for private device types as they need to be updated to support recent balenaOS versions. In doing this, new features are gained, bugs are fixed, and security vulnerabilities are patched. Releases are manually tested on AutoKit. We offer discounts on CDS Maintenance fees at 1,000 devices, but the cost doesn't approach $0 until the cumulative number of devices on the platform reach 10,000 devices.

#### Step 5: Payment and Dashboard Enablement

The Partner and balena will collaborate to enable your new device-type in balenaCloud, and when complete, you will be able to choose it as a Device in the drop-down of the balenaCloud dashboard.

At this point you are able to test the device-type and confirm for us that everything works as expected. When this work is complete, our Integration Partner will request final payment for the remainder (if they charged some portion up front) or all of their work.

### Requirements for Custom Device Support

#### Minimum Device Specs

* 1GB RAM or greater
* 4GB Storage or greater
* Block-based storage (eMMC, SDcard, SSDs, HDDS, NAND/NOR flash not supported)
* Currently supported Linux kernel, preferable LTS (Long Term Support)

What we need:

#### Documentation

* Basic Hardware Specs: We'll want to know all pertinent information including processor, available RAM, storage etc and all associated details.
* Vendor Documentation: Any documentation you are aware of, particularly documentation which provides a detailed description of your device's boot process.
* Datasheet: Preferably one that discusses your device's boot process in as much detail as possible
* Logo: A logo that would appear in the balenaCloud UI for your device type.

#### Software

* BSP Layer: Yocto BSP, current LTS. Please also include components versions, location of sources, and license details where applicable. Yocto BSP support (including but not limited to bootloader, kernel, and firmware) must be provided by the customer and/or OEM. Balena is not responsible for maintaining or providing these components.
* If Yocto support does not exist, we will communicate in more detail with the assigned Technical Point of Contact throughout the process about exact needs for your specific board, but at a minimum we will require the following:
* Bootloader sources
* Kernel sources
* Bootloader and Kernel configs required for this hardware
* Documentation for provisioning an OS image
* Documentation on booting options, including:
* How the hardware boots from microSD, USB, eMMC, etc.
* If any dip switches or jumpers need to be set to configure where the boot firmware loads the bootloader from, etc.
* Firmware for connectivity, such as Bluetooth or Wi-Fi
* Existing Linux Support: If this is not already included in the documentation above, let us know if there are any known linux distributions which both your application stack and this board run on (eg Ubuntu 20.04). Provide details and/or links to repos where applicable.

#### Additional

* Technical Point of Contact: Name and email address of the primary technical point of contact on your team. We will interface with this person to ask specific questions along the way and to help with testing and validating early versions of the OS images we will produce.
* Minimum Peripherals Requirements: Let us know if the custom image needs to support certain connectivity methods, cellular modems, or other peripherals.
* Timeline: Let us know when you intend to have a working version of the balenaOS image and when you expect to have devices running balenaOS in production.
* Legal: Let us know if there are any export control regulations that might apply to the board. Also, we will need to know if there are any other licensing or legal considerations that might require special handling.
* Confidentiality: Let us know if you have any requirements about the confidentiality of the balenaOS repos, base images, and any other public mentions of your device. In particular:
* The GitHub repository for this device type will be public, unless you let us know you prefer to keep it private Note: balena will charge for the costs associated with a private GitHub repository should you require this.
* Let us know if you want this device type to be Public in balenaCloud and thus available for any balena customer or if you wish it be Private and only available to people in your Organization.

### Sending Equipment and Devices to Balena

Note that two sets of hardware must be sent - one set to balena and one to our Integration Partner. In some cases, the Partner will request more than one set of hardware, in the case that something is broken as part of their integration process.

We require:

* A power supply
* Your custom hardware
* Any necessary peripherals
* Any necessary cables

<br>

When you have these ready, please let your Customer Success representative know, and they will send you the form we require to have completed to get your hardware successfully shipped through Customs to our office in Greece.

### Maintainership Agreement: Terms and Conditions

As part of balena’s maintenance of the new device type, the following is required from a CDS customer:

* Notification of any hardware changes, including new hardware shipped to balena for ongoing OS testing when necessary.
* Notification of any changes to bootloader sources, kernel versions, firmware versions, etc. as well as access to those files for inclusion with future versions of the device type.
* Yocto BSP support (including but not limited to bootloader, kernel, and firmware) must be provided by the customer and/or OEM. Balena is not responsible for maintaining or providing these components.

Future contact with balena can be made in the following ways:

* Submitting tickets through balena’s Support chat system (in the balenaCloud dashboard)
* Emailing your Customer Success contact at balena

If balena reaches out to the customer for questions about upcoming OS releases which require the customer's input, and balena does not receive response from the customer within 6 months, balena reserves the right to remove this device type from our dashboard and halt all actions related to its maintenance, or to make it a publicly available device type.

After discontinuance of support for this hardware by the manufacturer, or end of support for the Yocto version required by this hardware, balena commits to keeping the device type on the platform for up to two years, but with no further updates outside of critical security fixes if possible.

### FAQ

#### How long does the development process take?

There are three components to the time for completion: time it takes to receive your hardware, time it takes for our Integration Partner to have availability to begin the project, and the complexity of the actual work. On average, this process takes 2-3 months from the date of receiving hardware to the point you are able to test your hardware with balenaCloud. However, this can vary significantly, so please do check with your Customer Success representative and the Integration Partner to get a better sense of timing for your specific project.

#### I don’t want my device type to be visible to the balena community, can it be private to my org?

If you require that your custom device is confidential/private to your team, we do offer the ability to make both the GitHub repo for your device-type and the visibility of the device-type in the balenaCloud dashboard Private to your organization.

If you simply have custom hardware that wouldn’t be usable by any other customers, but the GitHub repo for your device-type doesn’t contain any proprietary / confidential information, we can keep that repo Public (to benefit the wider community) while still keeping your device-type private to your balenaCloud organization.

#### What happens if I make a major hardware revision?

Additional hardware revisions that, for example, involve modifying the DTB, may be subject to additional charges to cover any relevant modification and testing. If this work needs to be done by a Partner, you would also need to send your custom hardware to that vendor again.

If you suspect your hardware will go through several major revisions, please let your Customer Success representative know so that we can plan to have our Integration Partner keep your hardware for some amount of time before returning it to you.

#### I have a custom LTE modem I want to use with my board, is that covered?

Peripherals (e.g. modems) may require additional custom support and testing from our Integration Partners, and may increase the cost of providing custom device support. Note that our automated test suite does not test modems.

#### My hardware does not currently have Yocto support, can I still use Custom Device Support to onboard it to balena?

Balena compatibility does require a Yocto BSP. However, if the available BSP is not a Yocto BSP, the work may still be possible, but it will cost more and take longer.

#### Will my custom device type be able to get balena [Extended Support Releases](https://docs.balena.io/reference/OS/extended-support-release/)?

Yes, we are continuing to add more devices to AutoKit that will allow them to get ESR releases as well as the balena rolling release. If this is something you require, please let your Customer Success representative know.

#### Can I request custom changes at the hostOS level using this service?

CDS is intended to support new device types in balenaOS, it is not intended as a means to customize balenaOS at the meta-balena layer. Yocto layers specific to the device type can be modified as necessary in order to support the functionality of the device.

#### What if I stop paying my monthly CDS maintenance fee?

If you decide to not pay the ongoing CDS support fee, support for that device type will expire after 2 years of the last released version as there won't be new releases for it. This means that the device type won't be available anymore on balenaCloud. In the past, we've had customers stop paying for CDS support after onboarding who have later come back when they need a new release, but this approach is unlikely to work, as previously paying CDS customers are given priority. We strongly recommend not doing this!
