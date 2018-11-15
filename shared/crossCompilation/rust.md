#### Setting up {{ $language.name }} cross-compilation

Cross-compilation is needed when using `{{ $names.company.short }} sync` and **{{ $language.name }}** as it is a compiled language. Compiled languages are programming languages in which source code must be compiled into an executable form before it can be run.

__Warning:__ This guide is for Linux and will not work on Windows or OSX!

Luckily **{{ $language.name }}** cross-compilation is fairly easy to get setup using [rust-cross][rust-cross] and even easier to use.

To get started we first install {{ $language.name }} on our development machine. [rustup.rs][rustup.rs] makes this a lot easier and is highly recommended.
```
$ curl https://sh.rustup.rs -sSf | sh
```
Next up is the C cross-compilation toolchain.
```
$ sudo apt-get install -qq gcc-arm-linux-gnueabihf
```
Now we need to install a standard set of crates that have been cross-compiled for the **{{ $device.name }}**. A crate is synonymous with a ‘library’ or ‘package’ in other languages.
```
$ rustup target add {{ $device.rustTriple }}
```
Finally {{ $language.name }} must be configured to enable cross-compilation for the **{{ $device.name }}**.
```
$ mkdir -p ~/.cargo
$ cat >>~/.cargo/config <<EOF
> [target.{{ $device.rustTriple }}]
> linker = "{{ $device.rustLinker }}"
> EOF
```

Now that cross-compilation is set up it would be wise to test everything works before moving on to configuring `{{ $names.company.short }} sync`. The commands below will create a new **{{ $language.name }}** project and cross-compile it for your **{{ $device.name }}**.
```
$ cargo new --bin hello
$ cd hello
$ cargo build --target={{ $device.rustTriple }}
   Compiling hello v0.1.0 (file:///home/ubuntu/hello)
$ file target/{{ $device.rustTriple }}/debug/hello
hello: ELF 32-bit LSB  shared object, ARM, EABI5 version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=67b58f42db4842dafb8a15f8d47de87ca12cc7de, not stripped
```

Now that we have `{{ $names.company.short }} sync` and cross-compilation setup there is one more step needed to link them both together. This comes in the form of a `.{{ $names.company.short }}-sync.yml` file that needs to be created in the root of the application directory.
```
before: 'cargo build --target={{ $device.rustTriple }} && cp target/{{ $device.rustTriple }}/debug/balena-rust-hello-world target/debug/balena-rust-hello-world && rm -r target/{{ $device.rustTriple }}/'
```
This line has a lot packed into it but is really quite simple. The `before:` option ensures the command that follows is run on our local machine before syncing any changes to our device. First the changes must be cross-compiled for our device using `cargo build --target={{ $device.rustTriple }}`, next the compiled executable is copied from the cargo output directory `{{ $device.rustTriple }}` to `debug`, finally the cargo output directory is deleted to save space and reduce syncing time.

[rust-cross]:https://github.com/japaric/rust-cross
[rustup.rs]:https://www.rustup.rs/
