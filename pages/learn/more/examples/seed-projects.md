---
title: Seed Projects
---

# {{ $names.company.upper }} Seed Projects

## Programming Language Seed Projects

Below is a list of simple 'Hello, World' projects written in a number of
different programming languages, which are designed to form the basis of your
own projects written in each language.

The projects use [Dockerfiles][dockerfile] to install packages and configure the
local environment as needed for each language. This step is performed on the
build server and the finished product is pushed to your devices.

## Installing a Project

To install a project you will need a [{{ $names.company.lower }}][balena]
account with an application set up ready to receive code. See the [getting
started][getting-started] and [deployment][deploy] guides for details on how to
do this with the {{ $names.cli.lower }}.

## Projects

* [Node.js][simple-nodejs-server-link]
* [Python][simple-python-server-link]
* [C++][balena-cpp-hello-world]
* [Rust][balena-rust-hello-world]
* [Go][balena-go-hello-world]
* [Haskell][balena-haskell-hello-world]
* [Java][balena-java-hello-world]
* [C][balena-c-hello-world]

[dockerfile]:/deployment/dockerfile
[balena]:{{ $links.mainSiteUrl }}/
[getting-started]:/installing/gettingStarted
[deploy]:/deployment/deployment
[simple-nodejs-server-link]:{{ $links.githubLabs }}/simple-server-node.git
[simple-python-server-link]:{{ $links.githubLabs }}/simple-server-python.git
[balena-cpp-hello-world]:{{ $links.githubLabs }}/balena-cpp-hello-world.git
[balena-rust-hello-world]:{{ $links.githubLabs }}/balena-rust-hello-world.git
[balena-go-hello-world]:{{ $links.githubLabs }}/balena-go-hello-world
[balena-haskell-hello-world]:{{ $links.githubLabs }}/balena-haskell-hello-world
[balena-java-hello-world]:{{ $links.githubLabs }}/balena-java-hello-world
[balena-c-hello-world]:{{ $links.githubLabs }}/balena-c-hello-world
