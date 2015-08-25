# SSH Keys for Multiple Accounts

If you sign up for multiple Resin.io accounts (each requiring unique SSH keys) you may encounter problems pushing code to projects with the following error message:-

```
Connection closed by [ip address]
fatal: Could not read from remote repository.
```

Our git server authenticates you with the first valid key your SSH client provides then checks it against the owner of the project you're pushing to - if the authenticated key doesn't match one of the keys associated with the account, the push is rejected.

If the first key provided to the server happens to be a key associated with a separate account, then unfortunately you will have all pushes to the curent account rejected.

You can check whether you are able to connect to our git server at all via `ssh -T joebloggs@git.resin.io` - if you receive a welcome message then it's likely due to the aforementioned issue.

## Workaround

To work around this problem you can create aliases for each login. In Unix-like environments, edit `~/.ssh/config` and add an entry of the following form, updating 'joebloggs' and your SSH key to match the account the alias should refer to.

```
Host resin-as-joebloggs
	 HostName git.resin.io
	 User git
	 IdentityFile ~/.ssh/joebloggs_id_rsa
	 IdentitiesOnly yes
```

You then need to update the git remote of the project in question via:-

```
git remote set-url resin git@resin-as-joebloggs:[your username]/[app name].git
```
