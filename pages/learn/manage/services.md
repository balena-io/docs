# Services

A fleet's release provides a collection of services to run as containers on each device. The Services table at the bottom of the Device Summary page allows you to view information and control operations for each of those service containers.

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

The table displays the name, status, and active release of each service. The clickable icons on the right allow control over the service container.

## Service status

<table><thead><tr><th width="196">Status</th><th>Description</th></tr></thead><tbody><tr><td>Running</td><td>Container is running.</td></tr><tr><td>Downloading</td><td>Downloading a version of the service image.</td></tr><tr><td>Downloaded</td><td>Service image downloaded but not yet running.</td></tr><tr><td>Stopping</td><td>Stopping execution of the container, typically to replace it.</td></tr><tr><td>Deleting</td><td>Deleting an image from storage.</td></tr><tr><td>Exited</td><td>Container execution completed and no longer running.</td></tr><tr><td>Handing over</td><td>Waiting for new container to confirm <a href="https://docs.balena.io/learn/deploy/release-strategy/update-strategies#hand-over">hand-over</a>. </td></tr><tr><td>Awaiting handover</td><td>Container for new release has started and initiated hand-over.</td></tr></tbody></table>

## Control icons

<table><thead><tr><th width="197">Name</th><th>Description</th></tr></thead><tbody><tr><td>Start</td><td>Start a stopped container.</td></tr><tr><td>Stop</td><td>Stop a running container.</td></tr><tr><td>Restart</td><td>Stop the container, remove it and create a new one from the image, and then start it.</td></tr><tr><td>Show logs</td><td>Update the Logs panel to filter messages down to only those from this service container.</td></tr></tbody></table>
