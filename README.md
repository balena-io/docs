# balenaCloud Documentation

![GitHub tag](https://img.shields.io/github/v/tag/balena-io/docs)  ![GitHub issues](https://img.shields.io/github/issues/balena-io/docs)  ![GitHub License](https://img.shields.io/github/license/balena-io/docs)

Documentation for the [balenaCloud](https://balena.io/) platform lives here.  
Join our [forums](https://forums.balena.io/) to chat.

This repo intends to provide our public-facing documentation. To view the documentation generated by this repo, one could either [run locally](#getting-started) or view the [hosted version](https://www.balena.io/docs/).

## Getting Started

To get started for contributing to balenaCloud documentation, follow the steps below: 

```bash
git clone https://github.com/balena-io/docs.git
cd docs
npm install
npm run build
```

Now to check that everything is working correctly, start the local server with:

```
npm start
```

You should now see the docs served from [http://localhost:3000/docs](http://localhost:3000/docs) running locally on your device. Running locally helps in seeing the preview of your changes quickly to improve changes.

> Note: if you are using macOS and you get `"RangeError: Maximum call stack size exceeded" `
> when running `npm install` (which eventually calls the `build.sh` script), have a look at
> the comments at the top of the "Dockerfile.bindmount" file.

To add you changes to the docs, create a new local branch of master:

```
git checkout -b my-docs-patch
```

Now you can make changes to this branch. The docs are generated from markdown files as static pages using metalsmith.io. Hence, each time any changes are made `.md` files, a rebuild needs to be triggered to generate the static pages again. One can quickly rebuild using the command:

```
npm run build:fast
```

This command will skip over downloading files from external sources, which takes a while. However, there is a handy watch functionality that will watch for changes in `/pages`, `/shared`, and `/templates` and rebuild each time any changes are made. To use this, open a new tab in your terminal and run:

```
npm run watch-pages
```

Once you are satisfied with the changes, make the commits, push the changes and submit a pull request for your branch against `master`. Make sure to read the [CONTRIBUTING document](CONTRIBUTING.md) before committing.

_Note_ that you have to restart the development server if you edit other things like `redirects.txt`.

## How to Contribute

If you think a part is not documented, is outdated, or can be improved on the [docs](https://docs.balena.io), don't hesitate to send a PR! Check our [CONTRIBUTING document](CONTRIBUTING.md) for the guidelines to ensure your PR can be merged as quickly as possible.
One can open or check existing issues on [GitHub issues](https://github.com/balena-io/docs/issues). Looking forward to seeing your contributions!

> Pro tip: Use the "Improve This Doc" button to make changes to the correct file. 

![Improve-this-doc-button](https://user-images.githubusercontent.com/22801822/113422793-ee9f9c00-93ea-11eb-90de-539e3438babb.png)

## Deploying

Shortly after merging a PR to the `master` branch, Flowzone will run on the deploy script `npm run deploy-docs` on master branch and deploy the docs on [balenacloud-docs.pages.dev](https://balenacloud-docs.pages.dev).

The docs are hosted on Cloudflare Pages as a static site. 

## Style manual

### Balena-specific words

For all instances, we use `balena` as lower-case capitalization unless beginning a sentence (Ex. *I like balena. Balena is great.*). More instances as follows,

* **balena** (used to refer to the company as a whole, not in place of balenaCloud, balenaOS or any other project)
* **balenaEtcher**
* **balenaOS** (note the capitalization of **OS**)
* **balenaEngine**
* **balenaFin**
* **balenaCloud**
* the **balena CLI**
* the **balena Supervisor**
* **openbalena**

### Conventions & Best Practices

- Notes/Warnings are formatted using CSS. Use the following syntax to make sure it's rendered correctly: `__Note:__`

- It's important to note that `h1` and `h2` headings will automatically be included on the left sidebar, so make sure to use these appropriately and sparingly.

- We also use globally accessible variables to interpolate strings, reuse variables easily and maintain consistency across the documentation to follow a consistent naming convention. 

- Module containing the variable can be found [/config](https://github.com/balena-io/docs/tree/master/config) directory with several modules for links, names, etc. containing references being used across the documentation. These references can be used inside the documentation files using fluid tags like the examples below. 

1. Reusing commonly used names as variables - `Deploy with {{ $names.company.lower }}`
2. Interpolating strings - `{{ $names.os.lower }} image configured`
3. Even, building links - `{{ $links.githubLabs }}/multicontainer-getting-started/tree/master/haproxy`

### Using Partials

When creating new content or altering current pages, it's recommended to try and keep things DRY (Don't Repeat Yourself). This is accomplished in the balenaCloud documentation by using "partials". The sub-directories of the`/shared` folder contain snippets or partials of the docs, which can be reused anywhere in the documentation. They also allow you to cleverly override a partial for a particular board type and language type. In general, most of them contain a `_default.md`, which means the default partial will be used for all boards and language types. But, for partials for sections like `getDeviceOnDash` has device-specific overrides such as the one below.

```
├── getDeviceOnDash
│   ├── _default.md
│   ├── artik10.md
│   ├── artik5.md
│   ├── raspberrypi.md
│   ├── raspberrypi2.md
│   └── raspberrypi3.md
```

To use these partials in a markdown page, all you need to do is add the following onto the page:

```
{{ import “getDeviceOnDash” }}
```

On build time, the engine will pull that partial into this location on the page. This way, pages can be generated dynamically based on specific conditions, much like the [Getting Started](https://www.balena.io/docs/learn/getting-started) docs.

### Using Templates

In dynamically generated pages (the ones with the device-type and language dropdown), it is possible to use templates to dynamically change the device name and language name in your text. 

Here is an example:

```
Getting started with {{ $device.name }} using {{ $language.name }}

Select the {{ $device.name }} device type`
```

To add additional dynamic properties, see the files in `/config/dictionaries`. To learn more about dynamically generated pages, see the [README](https://github.com/balena-io/doxx) for the Doxx project, which is used to generate those pages for the balenaCloud documentation.

## License

The project is licensed under the Apache 2.0 license.

## Testing

This is a TOCTOU test, please ignore!
