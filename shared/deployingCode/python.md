<!-- deploying Code to devices -->

Now that we have a device or two connected to a resin.io application, lets deploy some code and actually start building something.

A nice first project to get your feet wet is a simple [Flask][flask-link] web server which will serve a static page on port `:80`. All the project source code can be found [here on github] [simple-server-python-link].

To clone the project, run the following command in a terminal or your preferred git client:

```
$ git clone https://github.com/resin-io-projects/simple-server-python.git
```

Once the repo is cloned, change directory into the newly created `simple-server-python` directory and add the resin git remote endpoint by running the command `git remote add` shown in
the top-right corner of your application page, here's an example:

```
$ cd simple-server-python
$ git remote add resin charlie1@git.resin.io:charlie1/myfleet.git
```
__Note:__ On other git clients there may be an alternative way to add a remote repository.

So now we have set up a reference in our local git repository (the one on our development computer) to the resin.io application remote repository. So when we push new changes to this remote repository it will get compiled and built on our servers and deployed to every device in the application fleet.

Now to deploy this code to all device(s) in the application just run the command:
```
$ git push resin master
```

If you want to completely replace the source code of the application with a new source tree, you may need to force the push by running `git push resin master --force`, due to how git works.

__Note:__ On your very first push, git may ask you if you would like to add this host to your list of allowed hosts. Don't worry about this, just type 'yes' and carry on your merry way.

You'll know your code has been successfully compiled and built when our
friendly unicorn mascot appears in your terminal:

<img src="/img/common/pushing/success_unicorn_simple_nodejs.png" width="80%">

This means your code is safely built and stored on our image registry. It should only take about 2 minutes to build your code and subsequent builds will be quicker because of build caching.


Your application will now be downloaded and executed by all the devices you have connected in your application fleet. You may have to wait about 6 minutes for the first push... So time for more tea, but don't worry, all subsequent pushes are much, much faster due to [Docker layer sharing][dockerLayerDocs]. You can see the progress of the device code updates on the device dashboard:

<img src="/img/common/device/device_dashboard_during_update_generic.png" width="80%">

You should now have a Python web server running on your device and see some logs on your dashboard. If you go to the `Actions` page for your device, you can enable a public URL, this URL is accessible from anywhere in the world.

<img src="/img/common/enable-public-URLs.png" width="80%">

If you follow the URL, you will be served a page saying "Hello, World!". Alternatively you can point your browser to your devices IP address.

You should now have a basic idea of how to deploy a Python application on resin.io. If you feel like you have a handle on docker and Python projects, then skip over the next section and go straight to ["Using the web terminal"](#using-the-web-terminal).

[simple-server-python-link]:https://github.com/resin-io-projects/simple-server-python

[dockerLayerDocs]:https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/
[flask-link]:http://flask.pocoo.org/
