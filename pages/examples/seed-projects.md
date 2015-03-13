# Resin.io Seed Projects

## Programming Language Seed Projects

Below is a list of simple 'Hello, World' projects written in a number of
different programming languages, which are designed to form the basis of your
own projects written in each language.

The projects use [Dockerfiles][dockerfile] to install packages and configure the
local environment as needed for each language. This step is performed on the
resin.io build server and the finished product is pushed to your devices.

A link is provided for each project's individual Dockerfile below for easy
customisation.

## Installing a Project

To install a project you will need a [resin.io][resin] account with an
application set up ready to receive code. See the
[getting started][getting-started] and [deployment][deploy] guides for details
on how to do this.

To deploy a project simply clone it and push it to your application's `resin`
endpoint. E.g. for the [Text to Speech Converter project][text2speech]:-

```
git clone https://github.com/resin-io/text2speech.git
git remote add resin [endpoint]
git push resin master
```

### Node.js

[Repository][simple-nodejs]

This is a simple Hello, World project for [node.js][node] designed to act as a
basis for future work. It demonstrates how to install native Linux packages and
configure your application.

### Python

[Repository][hello-python]

Hello World written in [Python][python] using a [custom Dockerfile][python-dockerfile].

### C♯

[Repository][hello-dotnet]

Hello World written in [C#][csharp] using a
[custom Dockerfile][csharp-dockerfile].

__NOTE:__ This project can be adapted to target any [.net][dotnet]
language.

### Java

[Repository][hello-java]

Hello World written in [Java][java] using a
[custom Dockerfile][java-dockerfile].

__NOTE:__ This project can be adapted to target any [JVM][jvm] language.

### Ruby

[Repository][hello-ruby]

Hello World written in [Ruby][ruby] using a [custom Dockerfile][ruby-dockerfile].

[dockerfile]:/pages/using/dockerfile.md
[text2speech]:https://github.com/resin-io/text2speech

<!-- ###Language Demo Projects Links  -->

[csharp]:http://msdn.microsoft.com/en-gb/vstudio/hh341490.aspx
[dotnet]:http://www.microsoft.com/net
[jvm]:http://en.wikipedia.org/wiki/Java_virtual_machine
[java]:https://www.java.com/en/
[python]:https://www.python.org/
[ruby]:https://www.ruby-lang.org/en/

[simple-nodejs]:https://github.com/resin-io/basic-resin-node-project
[hello-dotnet]:https://github.com/nghiant2710/hello.NET
[hello-java]:https://github.com/nghiant2710/Hello-Java
[hello-python]:https://github.com/alexandrosm/hello-python
[hello-ruby]:https://github.com/nghiant2710/Hello-Ruby

[csharp-dockerfile]:https://github.com/resin-io/hello.NET/blob/master/Dockerfile
[java-dockerfile]:https://github.com/resin-io/Hello-Java/blob/master/Dockerfile
[python-dockerfile]:https://github.com/alexandrosm/hello-python/blob/master/Dockerfile
[ruby-dockerfile]:https://github.com/resin-io/Hello-Ruby/blob/master/Dockerfile