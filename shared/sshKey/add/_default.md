### Adding an SSH Key

SSH keys use the power of [public-key cryptography][pub_key_crypto] to secure
your connection when sending your code to us. In order to secure your [git][git]
connection, you need to add your __public__ [SSH Key][ssh_key] (you should never share
your *private* key with anyone.)

<img src="/img/common/sign_up_flow/enter_ssh_key_cropped.png" width="80%">

Simply paste your __public__ key into the box provided on the UI and click `save`. Alternatively you can import your key from [Github][github], just click on the Octocat icon.

#### Don't have a SSH key?
If you don't have an ssh key or have never used one, we recommend you take a look at [Github][github]'s [excellent documentation][github_ssh] on the subject and how to generate a key pair for your OS.

Once generated, SSH keys are easy to use. In fact you generally don't have to think about it at all. Once you're set up just `git push` your code to resin.io and it's taken care of automatically and securely.

#### Import SSH key From GitHub

For convenience we provide the ability to import your public SSH key from
[GitHub][github] - just click on the Octocat icon in the bottom right-hand
corner ([we use][github_ssh_blogpost] GitHub's [public APIs][github_apis] to
retrieve this data.)

You will then have to enter your github username into the prompt:

<img src="/img/common/sign_up_flow/enter_github_username_cropped.png" width="60%">

If you don't have a ssh key setup yet, but want to explore resin.io, just click `skip`. Note that you will not be able to push code to your {{ $device.name }} until you have a ssh key saved. This can be done at anytime from the [`Preferences`][prefsPage] page on the dashboard.

[pub_key_crypto]:http://en.wikipedia.org/wiki/Public-key_cryptography
[git]:http://git-scm.com/
[ssh_key]:http://en.wikipedia.org/wiki/Secure_Shell
[github]:http://github.com/
[github_ssh]:https://help.github.com/articles/generating-ssh-keys
[github_ssh_blogpost]:http://resin.io/blog/email-github-public-ssh-key/
[github_apis]:https://developer.github.com/v3/
[prefsPage]:https://dashboard.resin.io/preferences?tab=sshkeys
