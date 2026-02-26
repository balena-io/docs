# Contributing

Thank you for contributing to the docs! We have a few guidelines which will allow your PR to pass our CI checks and successfully merge.

### Creating Commits using the GitHub UI

For folks using the Github UI to create new pull requests, check out the following guides in order to get started. 

1. [Editing files and proposing changes](https://docs.github.com/en/github/managing-files-in-a-repository/editing-files-in-your-repository) on a GitHub Repository. 

![example-prefix-commit-githubui](https://user-images.githubusercontent.com/22801822/113337642-ac704f00-9345-11eb-9df3-43c07e06c9bf.png)

2. When the changes have been committed, [create a pull request for the proposed changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request#creating-the-pull-request) through the GitHub UI. 

## Adding images/screenshots to the docs

> Choose whichever format that suits your need

Images and screenshots help the user in better understanding of the docs. Before adding a screenshot, make sure to keep the area in focus, text is clearly visible and doesn't have any identifying information. Rename the screenshot appropriately and make sure to upload them to the right path.

![](./pages/.gitbook/assets/plan_selection.webp)

Do mark the menu options, buttons or tabs with a red box as and when needed.

![](./pages/.gitbook/assets/current_plan.webp)

Images for the documentation are stored in the [/pages/.gitbook/assets/](https://github.com/balena-io/docs/tree/main/pages/.gitbook/assets) directory.

To add an image to the documentation,

1. Upload/add the image(s) to the [/pages/.gitbook/assets/](https://github.com/balena-io/docs/tree/main/pages/.gitbook/assets) directory. One can also use the GitHub UI to [upload files](https://docs.github.com/en/github/managing-files-in-a-repository/adding-a-file-to-a-repository). 
2. Images need to be uploaded in `PNG`, `JPEG`, `SVG`, or `WEBP` format to render correctly in markdown. It is preferable to use the `WEBP` format in order to optimize the docs loading experience.
3. When added, refer and add them to the relevant documentation page as shown in the example below:

```html
<figure><img src="./pages/.gitbook/assets/create_api_key.webp" alt=""><figcaption></figcaption></figure>
```

## Adding links to the docs

Use the following format for external links: `[I'm an inline-style link](https://docs.balena.io)`.

For internal links (referencing our own documentation), use the following format instead: `[basic requirements](../../reference/os/network.md#network-requirements)`. The path for the internal link is relative. To determine the path, see the following instructions:
1. Gitbook notes where the page is according to the `SUMMARY.md`. i.e. a configuration list page would be in `/reference/supervisor/configuration-list/advantech-ecu1370` even though we generate it into `/external-docs/configuration-list/advantech-ecu1370`. This is because we have established in the `SUMMARY.md` that these pages are under the `/reference/supervisor/configuration-list/` folder
2. Note where the file you want to link to is in the `/pages` directory. If it is in `/pages/external-docs`, you will now create a relative link not from `/external-docs/configuration-list/advantech-ecu1370` but from `/reference/supervisor/configuration-list/advantech-ecu1370`. So it would appear something like `../../../external-docs/etc`.

## Contributing to External Documentation

Some reference documentation is sourced from external repositories and should be updated at the source. External docs are version-pinned in [`external-docs.json`](external-docs.json) and synced via Renovate.

To add additional external documentation:

1. Add an entry to [`external-docs.json`](external-docs.json) with the repo, pinned version tag, and file mappings.
  a. If the external doc is intended to be its own page, the target directory for it to be generated to should be within `/pages` but not within `/pages/.gitbook`.
  b. If the external doc is intended to be used within another page, the target directory for it to be generated to should be within `/pages/.gitbook/includes` so that it can be used as reusable content where necessary.
2. Run `npm run sync-external` to fetch the content.
3. If the external doc is its own page, add an entry to [`pages/SUMMARY.md`](pages/SUMMARY.md) so the page appears in the documentation navigation.

Renovate will automatically detect version updates and create PRs with the synced content.

## Best Practices to follow

Be sure to familiarize yourself with the style manual and conventions to be followed while contributing to balenaCloud documentation. This helps in maintaining consistency of the documentation already written by other contributors. These best practices also help avoid common mistakes and make sure one is using templates & partials the right way.

- How to write [balena-specific words](README.md#balena-specific-words)
- Using [Reusable Content](README.md#using-reusable-content) and [Templates](README.md#using-templates)