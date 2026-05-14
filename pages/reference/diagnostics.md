# Diagnostics

## Getting Started

The balenaCloud Dashboard includes the ability to run diagnostics on
a device to determine its current condition. This should
be the first step in attempting to diagnose an issue without having to
actually access the device via SSH. Ensuring diagnostics and health checks
are examined first ensures that you have a good idea of the state a
device is in before SSHing into it, as well as ensuring that the information can
be accessed later if required (should a device be in a catastrophic state). This
helps significantly in a support post-mortem should one be required.

Currently, diagnosis feature is only available via the Dashboard. Diagnostics are split into three separate sections: 

- [Device Health Checks](#device-health-checks) 
- [Device Diagnostics](#device-diagnostics)
- [Supervisor State](#supervisor-state)


## Device Health Checks 

To run device health checks through balenaCloud dashboard, head to the `Diagnostics` tab in the sidebar and click the `Run checks` button to start the tests.

![diagnostics](https://user-images.githubusercontent.com/22801822/154141814-6953717d-f90a-456b-ad51-474b14dcc5e9.png)

As part of the diagnostics suite, you will find a group of checks that can be collectively run on-device. Below is a description of each check and what each means or how to triage.

A `check` in this context is defined as a function that returns a result (good/bad status plus some descriptive text), whereas a
command is simply a data collection tool without any filtering or logic built in. Checks are intended to be used by
everyone, while typically command output is used by support/subject matter experts and power users.

{% include "../.gitbook/includes/health-checks.md" %}


## Building & Surfacing your own healthchecks in the dashboard

We allow users to provide their own health checks using the [HEALTHCHECK directive](https://docs.docker.com/engine/reference/builder/#healthcheck) defined in the Dockerfile or docker-compose file. With healthchecks, you can test a container to check that it's still working and healthy.

Any health check output will be collected as-is, truncated to 100 characters, and shown as output along with the exit code. The result of the health check will be available in the dashboard in the `Diagnostics` page under the `Device health checks` tab.

Here's a [working example](https://github.com/balena-io-examples/healthcheck-publicurl) of how **HEALTHCHECK directive** works in a balenaCloud dashboard demo. 


## Device Diagnostics

Move to the `Device Diagnostics` tab on the `Diagnostics` page and click the
`Run diagnostics` button.

Device diagnostics can be considered a more detailed snapshot of a running
system as opposed to the healthchecks, which give the current status of a few
of the core components of the OS.

Once the diagnostic run has completed, you'll see a lot of logs from commands
that have been run. The section `--- COMMANDS ---` shows a list of all of the
commands that are run to produce the diagnostics report. These commands cover
a wide range of functionality, but are comprised of 5 main areas:

- **BALENA** - The balenaEngine and latest journals
- **HARDWARE** - All aspects of HW, including CPU, memory and device tree info
  as well as statistics on device nodes, USB devices and disk space
- **NETWORK** - Covering everything from the current interface configurations
  to test pings/curls of remote hosts, the state of DNSmasq, OpenVPN and
  the current iptables configuration
- **OS** - This includes the current device configuration, the kernel log,
  the boot journal and the state of any HUP that may have been attempted
- **SUPERVISOR** - The current state and logs for the Supervisor
- **TIME** - The current date, state of the time and uptime for the device

Examination of this output will help to determine if something is not working
correctly. 

## Supervisor State

Click the `Supervisor State` tab on the `Diagnostics` page.

This does not require execution, and immediately queries the Supervisor to
determine its current configuration. This output is shown in two panels:

- **Supervisor status** - This is the current status of the Supervisor, including the address and port it can be reached on, the versions pertaining to it and the current status (note that this only works should the VPN be operational and connected to the balenaCloud backend).
  
- **Target supervisor state** - This is the target state for the Supervisor, based upon the release the device is associated with (usually this is the latest release, unless otherwise pinned). This includes all of the services, and any configuration set for each service, for the fleet, as well as configuration (such as boot and device tree settings).

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


#### DIAGNOSE_VERSION=4.23.1