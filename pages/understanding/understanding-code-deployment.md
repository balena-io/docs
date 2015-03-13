# Code Deployment

We use familiar tools like git to parse your code between you and our build servers. First things first, our git server receives the latest installment of your code at the endpoint we’ve generated for your application. Your codebase is then passed to our builders, which build your code into a Docker container for your devices.

# Building Containers

The method they use to build your code depends on the project. If your project includes a Dockerfile, the builders will execute every command there, from including the base OS you define, to installing packages, pulling git repositories, and running any other commands you specify. Otherwise, if your project includes a package.json (i.e. a node.js project), then that will be used instead to create an implicit Dockerfile, which simulates the build process a node.js/npm project expects. In this way, we are able to transparently run node.js projects on resin.io, while taking advantage of some of Docker’s caching features. A Dockerfile will always give you more power to fine-tune, but it’s also good to start fast, and you can shift to a Dockerfile whenever you like. We will soon add more languages to the “first-class” support we give to node.js. Until then, any other language can be used by adding a Dockerfile. It’s important to note that the environment within which your code gets built will match the devices you use for your app. So if you’re pushing to an app containing BeagleBone Black devices, we’ll build your code in an ARMv7 environment. For Raspberry Pi, it's ARMv6.


[containers]:http://en.wikipedia.org/wiki/Operating_system%E2%80%93level_virtualization
[git]:http://git-scm.com/