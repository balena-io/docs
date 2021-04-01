# Contributing

Thank you for contributing to the docs! We have a few guidelines which will allow your PR to pass our CI checks and successfully merge.

## Creating Commits in line with Semantic Versioning

The docs version numbering adheres to [Semantic Versioning](http://semver.org/). Please include  *at least one commit* in your PR that marks the change-type for the system. 

This change-type can be specified through a `Change-type` footer or by adding the change-type as a prefix to the commit, i.e., `minor: Add some new feature`. This is so the PR can be automatically versioned and a changelog generated for it by using versionbot. You have the option to choose one of the 3 `Change-type` when proposing a file change. 

- `patch` - For tiny changes that include typo fixes, updating screenshots, adding clarification notes, etc.
- `minor` - For moderate changes that include updating packages, rewriting documentation, adding new features.
- `major`- For substantial changes that include updating large parts of the documentation or migrating to new frameworks. 

### Creating Commits using the GitHub UI

For folks using the Github UI to create new pull requests, check out the following guides in order to get started. 

1. [Editing files and proposing changes](https://docs.github.com/en/github/managing-files-in-a-repository/editing-files-in-your-repository) on a GitHub Repository. When committing changes, here's how you can add a `Change-type` as a prefix to the commit. Adding `patch:` before your commit will mark the change-type successfully. 

![example-prefix-commit-githubui](https://user-images.githubusercontent.com/22801822/113337642-ac704f00-9345-11eb-9df3-43c07e06c9bf.png)

Alternatively, if you want to add a Change-type footer, here's how you can achieve that. Both methods are acceptable. 

![example-footer-commit-githubui](https://user-images.githubusercontent.com/22801822/113337904-0bce5f00-9346-11eb-9575-a87b11f0a31f.png)
  
2. When the changes have been committed, [creating a pull request for the proposed changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request#creating-the-pull-request) through the GitHub UI. 


### Using the Command-Line

For folks experienced with the git command-line, when creating a commit, make sure to add the `Change-type` prefix to a commit or add a commit footer to designate a `Change-type`. Following any of the two methods for creating a commit is acceptable.

1. Prefix `Change-type` to the commit - Use the command `git commit -m "patch: Update v8 configuration for contracts"`
2. Add `Change-type` footer to the commit - Use the command `git commit` to write the commit message below inside the editor that opens. 

```
Update v8 configuration for contracts

Change-type: patch
```

This will allow the system to version the documentation using the `Change-type` automatically. The versioning follows [semver](https://semver.org/), and changes can be of type `patch`, `minor` or `major`. Without the footer or the prefix in place, the CI checks will fail.

## Adding images to the documentation

> Choose whichever format that suits your need

Images for the documetation are stored in [static/img](https://github.com/balena-io/docs/tree/master/static/img) directory.

To add an image to the documentation,

1. Upload/add the image(s) to one of the folder inside the [static/img](https://github.com/balena-io/docs/tree/master/static/img) directory. Usually, the [common](https://github.com/balena-io/docs/tree/master/static/img/common) directory is where most screenshot(s) tend to fit well. 
2. Images need to be in the `PNG`, `JPEG`, or `SVG` format to render correctly in markdown. 
3. When added, refer and add them to the relevant documentation page using either the markdown format.

```markdown
![Descrption of the image](/img/common/app/cool-looking-image.png)
```

OR use the HTML <img> tag

```
<img alt="Description about the image" src="/img/common/app/cool-looking-image.png">
```

## Adding links to the docs

> Choose whichever format that suits your need

To add links in markdown, use the format `[I'm an inline-style link](https://docs.balena.io)` which results in [I'm an inline-style link](https://www.docs.balena.io)

OR using `[I'm a reference-style link][reference text]` which results in [I'm a reference-style link][reference text] where `reference text` is referred at the bottom of the markdown file. These link types can be used multiple times in the same document.

## External Documentation

It is worth noting that some of the reference documentation is sourced from the individual component repositories and should be updated at the source.

Currently, the following reference material is pulled from other repos:
- [Device Supervisor API](https://www.balena.io/docs/reference/supervisor/supervisor-api/) and [Device Supervisor upgrades](https://www.balena.io/docs/reference/supervisor/supervisor-upgrades), sourced from https://github.com/balena-io/balena-supervisor/tree/master/docs
- [CLI](https://www.balena.io/docs/reference/cli/) sourced from https://github.com/balena-io/balena-cli/blob/master/doc/cli.markdown
- [Node SDK](https://www.balena.io/docs/reference/sdk/node-sdk/) sourced from https://github.com/balena-io/balena-sdk/blob/master/DOCUMENTATION.md
- [Python SDK](https://www.balena.io/docs/reference/sdk/python-sdk/) sourced from https://github.com/balena-io/balena-sdk-python/blob/master/DOCUMENTATION.md

And more. The updated list of external resources can be found in [tools/fetch-external.sh](https://github.com/balena-io/docs/blob/master/tools/fetch-external.sh)  

## Version numbers & Changelogs

Version numbers and commit messages are automatically added to the `CHANGELOG.md` file by the CI build flow after a pull request is merged. It should not be manually edited.

[reference text]: https://balena.io
