---
title: Identical releases across multiple fleets
excerpt: Use the same release across multiple fleets using release bundles
---

# Identical releases across multiple fleets

It is common to use multiple fleets on {{$names.company.lower}} to organize application development and fleet operations. Some users dedicate fleets to development and testing, pushing only tested code to production fleets. Others may use a "canary" fleet with a subset of production devices for additional testing before full deployment.

Testing can take time, and building a release from the same source may produce a different image than before due to updated external dependencies or mutable Dockerfile base images (e.g., latest). Consequently, a release built later might behave differently.

To ensure the exact version of a tested release is deployed across fleets, you can export a release bundle file from an app, block, or fleet. This bundle allows you to import an identical copy of the release into another fleet. Unlike [{{$names.company.lower}} deploy][balena-deploy], which pushes images built locally, importing a release doesn't require a Docker engine on your machine.

__Note:__ Only successfully built releases can be exported.

## Release Bundles

Release bundles are files that contain all components of an application release, including release metadata and the images of services that make up the release. They can be stored offline and deployed to fleets, even in different {{$names.company.lower}} accounts.

## Exporting a Release

You can export a release to a release bundle using the {{$names.company.lower}} CLI.  

To export a release, you have two options:

1. Specify the commit of the release to be exported:

```shell
$ {{$names.company.lower}} release export c4f3b4b3 -o /path/to/release.tar
```
__Note:__ If more than one successful release with the same commit exists in multiple fleets, this option will not work due to ambiguity. The next option should be used instead.

2. Specify the application, block, or fleet in conjunction with the semantic version (semver) of the release.

```shell
$ {{$names.company.lower}} release export myOrg/myFleet --version 1.2.3 -o /path/to/release.tar
```

## Importing a Release

You can import a release from a release bundle into a {{$names.company.lower}} app, block, or fleet. This creates the release in the specified fleet with the version defined in the release manifest within the release bundle. Additionally, the images for the release are uploaded to the registry during the import process.

__Note:__ The revision number of the release's semantic version (semver) will not be set on the imported release. This number is automatically iterate by the {{$names.company.lower}} API when a release with the same semantic version already exists in the app, block, or fleet. 

Releases can be imported to multiple fleets. A new fleet can be created, and a release from an older fleet can be imported into it.

```shell
$ {{$names.company.lower}} release import /path/to/release.tar myOrg/myFleet 
```

You can also override the version of the release using the `--override-version` option.

```shell
$ {{$names.company.lower}} release import /path/to/release.tar myOrg/myFleet --override-version 1.2.3
```


[balena-deploy]:/learn/deploy/deployment/#balena-build--deploy