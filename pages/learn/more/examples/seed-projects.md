---
title: Seed Projects
---

# {{ $names.company.upper }} Seed Projects

## Programming Language Seed Projects

Below is a list of simple 'Hello, World' projects written in a number of
different programming languages, which are designed to form the basis of your
own projects written in each language.

The projects use [Dockerfiles][dockerfile] to install packages and configure the
local environment as needed for each language. This step is performed on the build server and the finished product is pushed to your devices.

A link is provided for each project's individual Dockerfile below for easy
customisation.

## Installing a Project

To install a project you will need a [{{ $names.company.lower }}][resin] account with an
application set up ready to receive code. See the
[getting started][getting-started] and [deployment][deploy] guides for details
on how to do this.

To deploy a project simply clone it and push it to your application's {{ $names.company.lower }}
endpoint. E.g. for the [Text to Speech Converter project][text2speech]:-

```
git clone {{ $links.githubMain }}/text2speech.git
git remote add {{ $names.company.short }} [endpoint]
git push {{ $names.company.short }} master
```

### Node.js

[Repository][simple-nodejs]

This is a simple Hello, World project for [node.js][node] designed to act as a
basis for future work. It demonstrates how to install native Linux packages and
configure your application.

[Repository][simple-nodejs-server-link]

This seed project runs a simple [Express.js][expressjs-link] server on port `:80`.
It is slightly different from the simple-nodejs project as it includes a [Dockerfile][resin-dockerfile-guide], this allows for more flexibility at build time and better caching of builds.

### Python

[Repository][hello-python]

Hello World written in [Python][python] using a [custom Dockerfile][python-dockerfile].

[Repository][simple-python-server-link]

This seed project runs a simple [Flask][flask-python-link] server on port `:80`.

### C♯

[Repository][hello-dotnet] by [Martin Calsyn][martincalsyn]

Hello World written in [C#][csharp] using a
[custom Dockerfile][csharp-dockerfile].

Martin is also currently building out a series of [.net][dotnet] {{ $names.company.lower }} examples, you can view his progress [here][dotnet-lib]

__NOTE:__ This project can be adapted to target any [.net][dotnet] language.

### Java

[Repository][hello-java]

Hello World written in [Java][java] using a
[custom Dockerfile][java-dockerfile].

__NOTE:__ This project can be adapted to target any [JVM][jvm] language.

### Scala

[Repository][hello-scala]

Hello World written in [Scala][scala] using a
[custom Dockerfile][scala-dockerfile]. Uses SBT to fetch the Scala runtime.

### Ruby

[Repository][hello-ruby]

Hello World written in [Ruby][ruby] using a [custom Dockerfile][ruby-dockerfile].

[dockerfile]:/deployment/dockerfile
[text2speech]:{{ $links.githubMain }}/text2speech

### Golang

[Repository][golang-seed-link]

This is a simple seed project for getting started with Go on the Intel Edison.
The project use [GB][gb-builder-link] to build the project and it's dependencies
in the `Dockerfile`.

__Note:__ This project will not build on any of the ARM architecture board. Currently,
this project will only work on the Intel Edison.

[{{ $names.company.lower }} Golang Image Example][golang-image-link]

This project contains examples of how to use {{ $names.company.lower }} Golang images on devices supported by {{ $names.company.upper }}.

### Flogo

You can use Project Flogo to develop IoT edge applications with no code using a graphical development web UI.

This hello world for Flogo helps you to get started.

[Repository][hello-flogo]


<!-- ###Language Demo Projects Links  -->

[csharp]:http://msdn.microsoft.com/en-gb/vstudio/hh341490.aspx
[dotnet]:http://www.microsoft.com/net
[jvm]:http://en.wikipedia.org/wiki/Java_virtual_machine
[java]:https://www.java.com/en/
[scala]:http://scala-lang.org/
[python]:https://www.python.org/
[ruby]:https://www.ruby-lang.org/en/
[dotnet-lib]:https://github.com/ResinIoDotNetExamples
[node]:https://nodejs.org/
[expressjs-link]:http://expressjs.com/
[flask-python-link]:http://flask.pocoo.org/

[simple-nodejs]:{{ $links.githubMain }}/basic-resin-node-project
[simple-nodejs-server-link]:{{ $links.githubProjects }}/simple-server-node.git
[hello-dotnet]:https://github.com/ResinIoDotNetExamples/Example-01-HelloWorld
[hello-java]:https://github.com/nghiant2710/Hello-Java
[hello-scala]:https://github.com/elecnix/Hello-Scala
[hello-python]:https://github.com/alexandrosm/hello-python
[simple-python-server-link]:{{ $links.githubProjects }}/simple-server-python.git
[hello-ruby]:https://github.com/nghiant2710/Hello-Ruby
[golang-seed-link]:https://github.com/shaunmulligan/resin-golang-seed.git
[golang-image-link]:https://github.com/nghiant2710/resin-golang-example.git
[gb-builder-link]:https://getgb.io/
[hello-flogo]:https://github.com/ecarlier-tibco/flogo-resin.io

[csharp-dockerfile]:https://github.com/ResinIoDotNetExamples/Example-01-HelloWorld/blob/master/Dockerfile
[java-dockerfile]:{{ $links.githubProjects }}/balena-java-hello-world/blob/master/Dockerfile.template
[scala-dockerfile]:https://github.com/elecnix/Hello-Scala/blob/master/Dockerfile
[python-dockerfile]:https://github.com/alexandrosm/hello-python/blob/master/Dockerfile
[ruby-dockerfile]:{{ $links.githubMain }}/Hello-Ruby/blob/master/Dockerfile

[martincalsyn]:https://github.com/martincalsyn

[deploy]:/deployment/deployment
[getting-started]:/installing/gettingStarted
[resin]:{{ $links.mainSiteUrl }}/
[resin-dockerfile-guide]:/deployment/dockerfile
