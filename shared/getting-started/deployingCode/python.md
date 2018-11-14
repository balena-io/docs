<!-- deploying Code to devices -->

Now that we have a device or two connected to a {{ $names.company.lower }} application, let's deploy some code and actually start building something.

A nice first project to get your feet wet is a simple [Flask][flask-link] web server which will serve a static page on port `:80`. All the project source code can be found [here on github] [simple-server-python-link].

To clone the project, run the following command in a terminal or your preferred git client:

```shell
$ git clone {{ $links.githubProjects }}/simple-server-python.git
```

Once the repo is cloned, change directory into the newly created `simple-server-python` directory and add the balena git remote endpoint by running the command `git remote add` shown in
the top-right corner of your application page:

```shell
$ cd simple-server-python
$ git remote add {{ $names.company.short }} <USERNAME>@git.{{ $names.domain }}:<USERNAME>/<APPNAME>.git
```
__Note:__ On other git clients there may be an alternative way to add a remote repository.

So now we have set up a reference in our local git repository (the one on our development computer) to the {{ $names.company.lower }} application remote repository. So when we push new changes to this remote repository it will get compiled and built on our servers and deployed to every device in the application fleet.

__Warning:__ The {{ $names.company.lower }} git repository **is not** intended as a code hosting solution, and we cannot guarantee the persistence of data in {{ $names.company.lower }} git remotes.

Now to deploy this code to all device(s) in the application just run the command:
```shell
$ git push {{ $names.company.short }} master
```

If you want to completely replace the source code of the application with a new source tree, you may need to force the push by running `git push {{ $names.company.short }} master --force`, due to how git works.

__Note:__ On your very first push, git may ask you if you would like to add this host to your list of allowed hosts. If the ECDSA key fingerprint matches `SHA256:NfwmqnKId5cx1RWpebbEuuM87bCJbdyhzRnqFES9Nnw`, you are pushing to the right place. Type 'yes' to continue.

You'll know your code has been successfully compiled and built when our
friendly unicorn mascot appears in your terminal:

<img src="/img/common/pushing/success_unicorn_simple_nodejs.png" width="80%">

This means your code is safely built and stored on our image registry. It should only take about 2 minutes to build your code and subsequent builds will be quicker because of build caching.


Your application will now be downloaded and executed by all the devices you have connected in your application fleet. You may have to wait about 6 minutes for the first push... So time for more tea, but don't worry, all subsequent pushes are much, much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the device code updates on the device dashboard:

<img src="/img/common/device/device_dashboard_during_update_generic.png" width="80%">

You should now have a Python web server running on your device and see some logs on your dashboard. If you go to the `Actions` page for your device, you can enable a public URL, this URL is accessible from anywhere in the world.

<img src="/img/common/enable-public-URLs.png" width="60%">

If you follow the URL, you will be served a page saying "Hello, World!". Alternatively you can point your browser to your devices IP address.

[simple-server-python-link]:{{ $links.githubProjects }}/simple-server-python

[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[flask-link]:http://flask.pocoo.org/
