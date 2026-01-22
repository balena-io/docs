# Supervisor State

Click the 'Supervisor State' tab on the 'Diagnostics' page.

This does not require execution, and immediately queries the Supervisor to
determine its current configuration. This output is shown in two panels:

- Supervisor status - This is the current status of the Supervisor, including the address and port it can be reached on, the versions pertaining to it and the current status (note that this only works should the VPN be operational and connected to the balenaCloud backend).
- Target supervisor state - This is the target state for the Supervisor, based upon the release the device is associated with (usually this is the latest release, unless otherwise pinned). This includes all of the services, and any configuration set for each service, for the fleet, as well as configuration (such as boot and device tree settings).

The Supervisor status should always be available; if it isn't, this
is an initial indication that something is wrong (including the Supervisor
itself failing to run).

The Supervisor status is useful for ensuring that versions of the Supervisor/OS
and access to the API is as expected (or has been changed, should access
be required).

The Target supervisor state is extremely useful for ensuring that a release is running
correctly upon a device (as the `docker-compose` manifest for the release
can be read from the fleet's 'Release' page in the Dashboard), as well
as ensuring it's the commit that's expected.