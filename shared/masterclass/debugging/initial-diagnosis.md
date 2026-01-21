
The balenaCloud Dashboard includes the ability to run a set of diagnostics on
a device to determine its current condition. This should, in most cases,
be the first step in attempting to diagnose an issue without having to
actually access the device via SSH. Ensuring diagnostics and health checks
are examined first ensures that you have a good idea of the state a
device is in before SSHing into it, as well as ensuring that the information can
be accessed later if required (should a device be in a catastrophic state). This
helps greatly in a support post-mortem should one be required.

Currently, diagnosis feature is only available via the Dashboard.

To run device diagnostics through balenaCloud dashboard, head to the `Diagnostics` tab in the sidebar and click the `Run checks` button to start the tests.

Read more about other diagnostics you can run after checking your device:

1. [Device Diagnostics](https://github.com/balena-io-modules/device-diagnostics/blob/master/device-diagnostics.md) 
2. [Supervisor State](https://github.com/balena-io-modules/device-diagnostics/blob/master/supervisor-state.md) 


