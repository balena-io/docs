__Note:__ You may also use git to deploy code to a device. If you wish to deploy via git see the instructions [here][gitdocs].

Now to deploy this code to all device(s) in the application, use the `balena push FirstApp` command replacing `FirstApp` with the name of your application. Ensure you are in the root of the project directory before issuing this command.

```shell
$ balena push FirstApp
```

This command will package up and push the code from the local directory to the balena builders, where it will be compiled and built and  deployed to every device in the application fleet.

You'll know your code has been successfully compiled and built when our
friendly unicorn mascot appears in your terminal:

```shell
[main]     Successfully built d5f1de77fad3
[Info]     Uploading images
[Success]  Successfully uploaded images
[Info]     Built on arm02
[Success]  Release successfully created!
[Info]     Release: f4e3925bf7d32226365225e1b7201b90 (id: 89693)
[Info]     ┌─────────┬────────────┬────────────┐
[Info]     │ Service │ Image Size │ Build Time │
[Info]     ├─────────┼────────────┼────────────┤
[Info]     │ main    │ 205.13 MB  │ 1 second   │
[Info]     └─────────┴────────────┴────────────┘
[Info]     Build finished in 7 seconds
			    \
			     \
			      \\
			       \\
			        >\/7
			    _.-(6'  \
			   (=___._/` \
			        )  \ |
			       /   / |
			      /    > /
			     j    < _\
			 _.-' :      ``.
			 \ r=._\        `.
			<`\\_  \         .`-.
			 \ r-7  `-. ._  ' .  `\
			  \`,      `-.`7  7)   )
			   \/         \|  \'  / `-._
			              ||    .'
			               \\  (
			                >\  >
			            ,.-' >.'
			           <.'_.''
			             <'
```

Your application will then be downloaded and executed by all the devices you have connected in your application fleet. The first push is slower to deploy, but all subsequent pushes are much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the device code updates on the device dashboard:

<img src="/img/common/device/download-progress.png" width="80%">

[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[gitdocs]:https://www.balena.io/docs/learn/deploy/deployment/#git-push
