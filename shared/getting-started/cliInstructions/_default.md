# \_default

* [macOS](_default.md#cli-osx)
* [Windows](_default.md#cli-windows)
* [Linux](_default.md#cli-linux)

1. [Download the CLI installer](_default.md).
2. Double click the downloaded file to run the installer and follow the installer's instructions.
3. To run balena CLI commands, open the Terminal app ([Terminal User Guide](https://support.apple.com/en-gb/guide/terminal/apd5265185d-f365-44cb-8b09-71a064a42125/mac)).
4. [Download the CLI installer](_default.md).
5. Double click the downloaded file to run the installer and follow the installer's instructions.
6. To run balena CLI commands, open a command prompt: Click on the Windows Start Menu, type PowerShell, and then click on Windows PowerShell.
7. [Download the standalone CLI](_default.md).
8. Extract the contents of the tar.gz file to any folder you choose, for example `/home/james`. The extracted contents will include a `balena/bin` folder.
9. Add that folder (e.g. `/home/james/balena/bin`) to the PATH environment variable. Check this [StackOverflow](https://stackoverflow.com/questions/14637979/how-to-permanently-set-path-on-linux-unix) post for instructions. Close and re-open the terminal window so that the changes to PATH can take effect.

For more detailed information, visit the [detailed Linux installation instructions](https://github.com/balena-io/balena-cli/blob/master/INSTALL-LINUX.md).

\
&#x20; window.addEventListener('load', function () {\
&#x20;   var appVersion = navigator.appVersion\
&#x20;   jQuery('#cli-osx-tab').tab('show') // initiate the first tab, not sure why you have to do this.\
&#x20;   if (appVersion.indexOf('Mac')!== -1) {\
&#x20;     jQuery('#cli-osx-tab').tab('show')\
&#x20;   }\
&#x20;   if (appVersion.indexOf('Win')!== -1) {\
&#x20;     jQuery('#cli-windows-tab').tab('show')\
&#x20;   }\
&#x20;   if (appVersion.indexOf('Linux')!== -1 || appVersion.indexOf('X11')!== -1) {\
&#x20;     jQuery('#cli-linux-tab').tab('show')\
&#x20;   }\
&#x20;   jQuery.getJSON('https://api.github.com/repos/balena-io/balena-cli/releases/latest', function (results) {\
&#x20;     var baseDownloadString = \`https://github.com/balena-io/balena-cli/releases/download/${results.tag\_name}/balena-cli-${results.tag\_name}\`\
&#x20;     jQuery('#cli-osx .cli-download-link').attr('href', \`${baseDownloadString}-macOS-x64-installer.pkg\`)\
&#x20;     jQuery('#cli-windows .cli-download-link').attr('href', \`${baseDownloadString}-windows-x64-installer.exe\`)\
&#x20;     jQuery('#cli-linux .cli-download-link').attr('href', \`${baseDownloadString}-linux-x64-standalone.tar.gz\`)\
&#x20;   })\
&#x20; })

***
