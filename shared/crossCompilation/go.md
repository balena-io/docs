#### Setting up {{ $language.name }} cross-compilation

Cross-compilation is needed when using `{{ $names.company.short }} sync` and {{ $language.name }} as it is a compiled language. Compiled languages are programming languages in which source code must be compiled into an executable form before it can be run.

__Warning:__ This guide is for Linux and will not work on Windows or OSX!

Luckily {{ $language.name }} cross-compilation is very easy to get setup and even easier to use.

To get started we need install {{ $language.name }} on our development machine. You can find the full {{ $language.name }} installation guide [here][install].
```
$ wget https://storage.googleapis.com/golang/go1.7.1.linux-amd64.tar.gz
$ sudo tar -C /usr/local -xzf go1.7.1.linux-amd64.tar.gz
$ echo export PATH=$PATH:/usr/local/go/bin >> ~/.profile
```

Now that we have `{{ $names.company.short }} sync` and cross-compilation setup there is one more step needed to link them both together. This comes in the form of a `.{{ $names.company.short }}-sync.yml` file that needs to be created in the root of the application directory.
```
destination: /go/src/github.com/balena-io-projects/balena-go-hello-world
port: 22
before: env GOOS=linux GOARCH=arm go build
```
The first line specifies the directory `balena sync` will sync the files to. The third line builds the {{ $language.name }} code for an arm device running linux.

[install]:https://golang.org/doc/install
