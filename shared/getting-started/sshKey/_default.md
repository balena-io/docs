### Adding an SSH Key

{{ $names.company.upper }} uses **git** to push code from your computer to a dedicated repository. As part of the account creation process, you will be asked to add a public SSH key. The SSH key secures your connection to our server, letting us know you have the authority to make changes to the repository.

__Note:__ You can click *Skip* to move past this step for now, but you will not be able to push code to your **{{ $device.name }}** until you have added a public key to your account. This can be done at any time from the [*Preferences*][prefsPage] page on the dashboard.

If you have a public SSH key, simply paste it into the box provided and click *Save Key*:

<img src="/img/common/sign_up_flow/enter_ssh_key_cropped.png" width="60%">

You can also import your key from **GitHub**. If you choose this option, you will be asked to enter your **GitHub** username:

<img src="/img/common/sign_up_flow/enter_github_username_cropped.png" width="60%">

#### Don't have an SSH key?
If you are unfamiliar with SSH keys, we recommend you take a look at **GitHub's** [excellent documentation][github_ssh]. This will walk you through everything you need to create a key pair. Window's user? Be sure to check out [these instructions][github_windows].

[github_ssh]:https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/
[github_windows]:https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-windows
[prefsPage]:{{ $links.dashboardUrl }}/preferences?tab=sshkeys
