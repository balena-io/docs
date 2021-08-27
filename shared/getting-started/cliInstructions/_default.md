<div>
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#cli-osx" aria-controls="cli-osx" role="tab" data-toggle="tab">Mac OSX</a></li>
    <li role="presentation"><a href="#cli-windows" aria-controls="cli-windows" role="tab" data-toggle="tab">Windows</a></li>
    <li role="presentation"><a href="#cli-linux" aria-controls="cli-linux" role="tab" data-toggle="tab">Linux</a></li>
  </ul>
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="cli-osx">
      <p>
        <ol>
          <li>
            Download the latest CLI installer <a href="test" class="cli-download-link">here</a>
          </li>
          <li>
            Double click the downloaded file to run the installer. After the installation completes, close and re-open any open command terminal windows (so that the changes made by the installer to the PATH environment variable can take effect).
          </li>
          <li>
            Check that the installation was successful by running <code>balena version</code>
          </li>
        </ol>
      </p>
      <p>
        For more detailed information, visit the <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL-MAC.md" target="_blank">detailed OSX installation instructions</a>. 
      </p>
	  </div>
    <div role="tabpanel" class="tab-pane" id="cli-windows">
      <p>
        <ol>
          <li>
            Download the latest CLI installer <a href="test" class="cli-download-link">here</a>
          </li>
          <li>
            Double click the downloaded file to run the installer. After the installation completes, close and re-open any open command terminal windows (so that the changes made by the installer to the PATH environment variable can take effect).
          </li>
          <li>
            Check that the installation was successful by running <code>balena version</code>
          </li>
        </ol>
      </p>
      <p>
        For more detailed information, visit the <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL-WINDOWS.md" target="_blank">detailed Windows installation instructions</a>. 
      </p>
    </div>
    <div role="tabpanel" class="tab-pane" id="cli-linux">
      <p>
        These instructions are suitable for most Linux distributions on Intel x86, except notably for Linux Alpine or Busybox. For these distros or for the ARM architecture, follow the <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL-ADVANCED.md#npm-installation" target="_blank">NPM Installation</a> method.
      </p>
      <p>
        <ol>
          <li>
            Download the latest CLI installer <a href="test" class="cli-download-link">here</a>
          </li>
          <li>
            Extract the zip file contents to any folder you choose, for example <code>/home/james</code>. The extracted contents will include a <code>balena-cli</code> folder.
          </li>
          <li>
            Add that folder (e.g. <code>/home/james/balena-cli</code>) to the PATH environment variable. Check this <a href="https://stackoverflow.com/questions/14637979/how-to-permanently-set-path-on-linux-unix" target="_blank">StackOverflow</a> post for instructions. Close and reopen the terminal window so that the changes to PATH can take effect.
          </li>
          <li>
            Check that the installation was successful by running <code>balena version</code>
          </li>
        </ol>
      </p>
      <p>
        For more detailed information, visit the <a href="https://github.com/balena-io/balena-cli/blob/master/INSTALL-LINUX.md" target="_blank">detailed Linux installation instructions</a>. 
      </p>
    </div>
  </div>
</div>
<script type="text/javascript">
  window.addEventListener('load', function () {
    jQuery.getJSON('https://api.github.com/repos/balena-io/balena-cli/releases/latest', function (results) {
      var baseDownloadString = `https://github.com/balena-io/balena-cli/releases/download/${results.tag_name}/balena-cli-${results.tag_name}`
      jQuery('#cli-osx .cli-download-link').attr('href', `${baseDownloadString}-macOS-x64-installer.pkg`)
      jQuery('#cli-windows .cli-download-link').attr('href', `${baseDownloadString}-windows-x64-installer.exe`)
      jQuery('#cli-linux .cli-download-link').attr('href', `${baseDownloadString}-linux-x64-standalone.zip`)
    })
  })
</script>

<hr />
