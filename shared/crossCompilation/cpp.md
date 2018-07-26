#### Setting up {{ $language.name }} cross-compilation

Cross-compilation is needed when using `{{ $names.company.short }} sync` and **{{ $language.name }}** as it is a compiled language. Compiled languages are programming languages in which source code must be compiled into an executable form before it can be run.

__Warning:__ This guide is for Linux and will not work on Windows or OSX!

Luckily **{{ $language.name }}** cross-compilation is fairly easy to get setup using [crosstool-ng][crosstool-ng] and even easier to use.

To get started we first install crosstool-ng on our development machine.
```
$ git clone https://github.com/crosstool-ng/crosstool-ng
$ cd crosstool-ng
$ ./bootstrap
$ ./configure
$ make
$ make install
```
Next we need to create a directory to hold the cross-compilation tool chains.
```
$ mkdir ~/toolchains/{{ $device.cppTriple }}
$ cd ~/toochains/{{ $device.cppTriple }}
```
Then we can run `ct-ng list-samples` to show a list of build targets that we can choose from. We need to target `{{ $device.cppTriple }}` for the **{{ $device.name }}**.
```
$ ct-ng list-samples
$ ct-ng {{ $device.cppTriple }}
$ ct-ng build
```
Enjoy a cup of tea whilst crosstool-ng is working, this step can take up to an hour.

Now that cross-compilation is set up it would be wise to test everything works before moving on to configuring `{{ $names.company.short }} sync`. The commands below will cross-compile `hello.cpp` for your **{{ $device.name }}**.
```
$ export PATH="${PATH}:${HOME}/x-tools/{{ $device.cppTriple }}/bin"
$ {{ $device.cppTriple }}-g++ -o hello hello.cpp
$ file hello
hello: ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux-armhf.so.3, for GNU/Linux 4.4.3, not stripped
```

Now that we have `{{ $names.company.short }} sync` and cross-compilation setup there is one more step needed to link them both together. This comes in the form of a `.{{ $names.company.short }}-sync.yml` file that needs to be created in the root of the application directory.
```
before: '{{ $device.cppTriple }}-g++ -o hello hello.cpp'
```
This line has a lot packed into it but is really quite simple. The `before:` option ensures the command that follows is run on our local machine before syncing any changes to our device. The changes are cross-compiled for our device using `{{ $device.cppTriple }}-g++` and the `-o` option  places the compiler output into `hello`.

[crosstool-ng]:http://crosstool-ng.org/
