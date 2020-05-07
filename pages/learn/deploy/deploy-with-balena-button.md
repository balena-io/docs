---
title: Deploy with {{ $names.company.lower }} button
excerpt: The Deploy with {{ $names.company.lower }} button allows users to do a single-click deployment and configuration of an application to {{ $names.cloud.lower }} 
---

# Deploy with {{ $names.company.lower }} button

The **Deploy with {{ $names.company.lower }}** button allows users to perform a single-click deployment and configuration of an application to {{ $names.cloud.lower }}.

![Deploy with {{ $names.company.lower }}](https://balena.io/deploy.png)

Clicking the **Deploy with {{ $names.company.lower }}** button opens the {{ $names.cloud.lower }} dashboard with a modal window pre-populated with everything required to deploy the application. Clicking the _Advanced_ toggle in the modal window allows adding additional configuration options. If the project has provided configuration variables via a [configuration file](#balena-yml), they are pre-populated.

<img src="/img/configuration/deploy-to-balena.png" width="80%">

Clicking _Create and deploy_ creates a new application and generates a release. Any devices added to the application will immediately download and begin running the release.

## Adding a deploy with {{ $names.company.lower }} button to a project

You can add the **Deploy with {{ $names.company.lower }}** button to any project that can be deployed to {{ $names.cloud.lower }}. To add the button to a project repository, add the following to, for example, the project repository's README.md file:

`[![](https://www.balena.io/deploy.png)](https://dashboard.balena-cloud.com/deploy)`

If the button is contained within a project repository, the URL of the repository will be automatically detected. In the case where you wish to link to a project from a different source, such as a blog post, you can customize the button's behavior through the use of [query string parameters](#query-string-parameters).

### Query string parameters

You can further customize the behavior of the **Deploy with {{ $names.company.lower }}** button by providing additional URL parameters. The following URL parameters are available and may be appended to the `https://dashboard.balena-cloud.com/deploy` link:

* `repoUrl` - The URL of the project repository.
* `tarballUrl` - The URL of the project tarball. Automatically determined from `repoUrl` if not provided.
* `configUrl` - The URL of the configuration file of the application. Automatically determined from `repoUrl` if not provided.

### balena.yml configuration file

Through the use of a `balena.yml` config file, you may also provide application [configuration](/learn/manage/configuration/) and [environment](/learn/manage/serv-vars/) variables. If provided, they are pre-populated in the advanced modal dialog when using the **Deploy with {{ $names.company.lower }}** button.

The file should be named `balena.yml` and be located in the root of the project repository, or the `configUrl` link must be specified. A full example of the `balena.yml` file is shown below:

```yaml
repoUrl: "https://github.com/owner/reponame"
tarballUrl: "https://url-pointing-to-a-tarball.tar.gz"
applicationConfigVariables:
 - RESIN_HOST_CONFIG_gpu_mem: 128
applicationEnvironmentVariables:
 - CONFIG_MODE: 0
 - CUSTOM_VALUE: my_value
```

__Note:__ You do not need to specify the  `tarballUrl` and `repoUrl` as part of the config file since those are determined automatically from the repository.
