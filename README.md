Resin.io Documentation
======================

[![Build status](https://ci.appveyor.com/api/projects/status/qbsivehgnq0vyrrb?svg=true)](https://ci.appveyor.com/project/fedealconada/resin-docs)

Join our online chat at [![Gitter chat](https://badges.gitter.im/resin-io/chat.png)](https://gitter.im/resin-io/chat)

Documentation for the [Resin.io](https://resin.io/) platform.

Role
----

The intention of this repo is to provide our public-facing documentation.


Running locally
---------------

To run the docs web application locally you should do the following:

```sh
git clone https://github.com/resin-io/docs
cd docs
npm install
npm install -g bower
bower install
tools/prepare.sh
npm start
```
And then open [http://localhost:3000](http://localhost:3000).

How to Contribute
----------

- Issue Tracker: [github.com/resin-io/docs/issues](https://github.com/resin-io/docs/issues)
- Source Code: [github.com/resin-io/docs](https://github.com/resin-io/docs)

If you think something is not documented, or can be improved, don't hesitate in sending a PR!

Conventions
-----------
- Notes/Warnings are formatted using CSS. Use the following syntax to make sure it's rendered correctly: `__Note:__`
=======
### Get Setup

```sh
git clone https://github.com/resin-io/docs.git
cd docs
npm install
```
Now to check that everything is working correctly, start the local server with:
```
npm start
```
You should now see the docs served from localhost:3000

To add you changes to the docs, create a new local branch of master:
```
git checkout -b my-docs-patch
```
Now you can make changes in this branch. Since our docs are static pages generated from markdown using metalsmith.io,  each time you change some of the `.md` files you will need to run rebuild of the docs to generate the static pages. This is done by running:
```
./tools/prepare.sh
```
However there is a handy watch functionality that will watch for changes in `/pages` and rebuild each time you save your changes. To use this, open a new tab in you terminal and run:
```
npm run watch-pages
```
Once you are happy with your changes, submit a pull request for you branch against `master`.

### Using Partials

When creating new content or altering current pages, its recommended that you try keep things D.R.Y (Don’t Repeat Yourself). This is made easy by using “partials”. If you look in the `/shared` folder you will see a number of folders, these keep snippets or partials of the docs that can be reused all over the place. They also allow you to cleverly override a partial for a particular board type and language type. So in general you will see most of them just contain a `_default.md` which means that this partial will be used for all board and language types, but for partials like `getDeviceOnDash` we have device specific overrides.

```
├── getDeviceOnDash
│   ├── _default.md
│   ├── artik10.md
│   ├── artik5.md
│   ├── raspberrypi.md
│   ├── raspberrypi2.md
│   └── raspberrypi3.md
```

To use these partials in a markdown page all you need to do is add the following in the page:
```
{{ import “getDeviceOnDash” }}
```
and the engine will pull that partial into this location in the page.

### Some other important bits

Its important to note that `h1` and `h2` headings will automatically be included in the left hand side navigation bar, so make sure to use these appropriately.

In the dynamically generated pages ( the ones with he device-type and language dropdown) it is possible to use templates to dynamically change the device name and language name in your text. Here is an example:
```
Getting started with {{ $device_details.name }} using {{ $language_details.name }}
```
To add additional dynamic properties, see the files in `/config/dictionaries`.

If you remove a page that may be linked to externally to the docs, remember to add it to the `redirects.txt` in the root of the docs, if you don’t, then links will break and people will have a bad time, m’kay.

If you need to add image assets, add them to the `/static/img` folder, either under common if these images are general to all of the devices or resin, otherwise add them to the specific device folder.

License
-------

The project is licensed under the Apache 2.0 license.
