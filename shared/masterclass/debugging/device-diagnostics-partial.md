# Device Diagnostics

Move to the 'Device Diagnostics' tab on the 'Diagnostics' page and click the
'Run diagnostics' button.

Device diagnostics can be considered a more detailed snapshot of a running
system as opposed to the healthchecks, which give the current status of a few
of the core components of the OS.

Once the diagnostic run has completed, you'll see a lot of logs from commands
that have been run. The section `--- COMMANDS ---` shows a list of all of the
commands that are run to produce the diagnostics report. These commands cover
a wide range of functionality, but are comprised of 5 main areas:

- BALENA - The balenaEngine and latest journals
- HARDWARE - All aspects of HW, including CPU, memory and device tree info
  as well as statistics on device nodes, USB devices and disk space
- NETWORK - Covering everything from the current interface configurations
  to test pings/curls of remote hosts, the state of DNSmasq, OpenVPN and
  the current iptables configuration
- OS - This includes the current device configuration, the kernel log,
  the boot journal and the state of any HUP that may have been attempted
- SUPERVISOR - The current state and logs for the Supervisor
- TIME - The current date, state of the time and uptime for the device

Examination of this output will help to determine if something is not working
correctly. 