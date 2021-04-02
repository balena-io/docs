# balenaCloud Documentation

![GitHub tag](https://img.shields.io/github/v/tag/balena-io/docs)  ![GitHub issues](https://img.shields.io/github/issues/balena-io/docs)  ![GitHub License](https://img.shields.io/github/license/balena-io/docs)

Documentation for the [balenaCloud](https://balena.io/) platform lives here.  
Join our [forums](https://forums.balena.io/) to chat.

The intention of this repo is to provide our public-facing documentation. To view the documentation generated by this repo, one could either [run locally](#getting-started) or view the [hosted version](https://www.balena.io/docs/).

## How to Contribute

If you think a part is not documented, outdated or can be improved on the [website](https://docs.balena.io), don't hesitate in sending a PR! Check our [CONTRIBUTING document](CONTRIBUTING.md) for the guidelines to ensure your PR can be merged as quickly as possible.
One can open or check existing issues on [GitHub issues](https://github.com/balena-io/docs/issues). Looking forward to see your contributions!

> Pro tip: Use the "Improve This Doc" button to identify the right file on the GitHub repository. 

![Improve-this-doc-button](https://user-images.githubusercontent.com/22801822/113422793-ee9f9c00-93ea-11eb-90de-539e3438babb.png)

## Getting Started

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

You should now see the docs served from [http://localhost:3000/docs](http://localhost:3000/docs) running locally on your device. This helps in iterating quickly while making changes and seeing the preview of every change.

> Note: if you are using macOS and you get `"RangeError: Maximum call stack size exceeded"`
> when running `npm install` (which eventually calls the `build.sh` script), have a look at
> the comments at the top of the `'Dockerfile.bindmount'` file.

To add you changes to the docs, create a new local branch of master:

```
git checkout -b my-docs-patch
```

Now you can make changes in this branch. Since our docs are static pages generated from markdown using metalsmith.io, each time you change some of the `.md` files you will need to run rebuild of the docs to generate the static pages. This is done by running:

```
npm run build:fast
```

This will skip over downloading files from external sources which takes a while. However there is a handy watch functionality that will watch for changes in `/pages`, `/shared`, and `/templates` and rebuild each time you save your changes. To use this, open a new tab in your terminal and run:

```
npm run watch-pages
```

Once you are happy with your changes, submit a pull request for you branch against `master`. Make sure to read the [CONTRIBUTING document](CONTRIBUTING.md).

_Note_ that you have to restart the development server if you edit other things like `redirects.txt`.

## Deploying

After a PR has been created, a member of the balena team will review and merge the PR. The pull request will undergo CI/CD checks to verify if everything is correct. For example: if a Change-type has been added. More information present in the [CONTRIBUTING document](CONTRIBUTING.md)

Shortly after merging the PR to the `master` branch, it'll automatically be deployed to our [production environment](https://www.balena.io/docs/) (This should only take a few minutes).

If the feature/change needs to be previewed, a member of the balena team can/will deploy the PR to staging to check the changes. If everything looks good, then the PR would be merged into the into the `master` branch. 

## Style manual

### Balena-specific words

For all instances, we use `balena` as lower-case capitalization unless beginning a sentence (Ex. *I like balena. Balena is great.*). More instances as follows, \

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

- It's important to note that `h1` and `h2` headings will automatically be included in the left hand side navigation bar, so make sure to use these appropriately and sparingly.

- We also use globally accessibly variables to easily interpolate strings, reuse variables, and maintain consistency all across the documentation for our naming convention. 

- Module containing the variable can be found [/config](https://github.com/balena-io/docs/tree/master/config) directory with several modules for links, names etc. containing references being used across the documentation. These references can be used inside the documentation files using fluid tags like the examples below. 

1. Reusing commonly used names as variables - `Deploy with {{ $names.company.lower }}`
2. Interpolating strings - `{{ $names.os.lower }} image configured`
3. Even, building links - `{{ $links.githubLabs }}/multicontainer-getting-started/tree/master/haproxy`

### Using Partials

When creating new content or altering current pages, its recommended that you try keep things D.R.Y (Don’t Repeat Yourself). This is made possible by using “partials”. If you look in the `/shared` folder you will see a number of folders, these keep snippets or partials of the docs that can be reused all over the place. They also allow you to cleverly override a partial for a particular board type and language type. So in general you will see most of them just contain a `_default.md` which means that this partial will be used for all board and language types, but for partials like `getDeviceOnDash` we have device specific overrides.

```
├── getDeviceOnDash
│   ├── _default.md
│   ├── artik10.md
│   ├── artik5.md
│   ├── raspberrypi.md
│   ├── raspberrypi2.md
│   └── raspberrypi3.md
```

To use these partials in a markdown page all you need to do is add the following onto the page:

```
{{ import “getDeviceOnDash” }}
```

On build time, the engine will pull that partial into this location on the page. This way pages can be generated dynamically on basis of specific condition much like the [Getting Started](https://www.balena.io/docs/learn/getting-started) docs.

### Using Templates

In dynamically generated pages (the ones with the device-type and language dropdown) it is possible to use templates to dynamically change the device name and language name in your text. 

Here is an example:

```
Getting started with {{ $device_details.name }} using {{ $language_details.name }}  

Select the {{ $device.name }} device type`
```

To add additional dynamic properties, see the files in `/config/dictionaries`.

## License

The project is licensed under the Apache 2.0 license.
