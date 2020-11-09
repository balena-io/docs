Label | Default | Description | Supervisor | balenaOS*
--- | --- | --- | --- | ---
io.{{ $names.company.short }}.features.balena-socket | false | Bind mounts the balena container engine socket into the container and sets the environment variable `DOCKER_HOST` with the socket location for use by docker clients. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.features.dbus | false | Bind mounts the host OS dbus into the container using `/run/dbus:/host/run/dbus`. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.features.sysfs | false | Bind mounts the host OS `/sys` into the container. | v10.8.0 | v2.48.0
io.{{ $names.company.short }}.features.procfs | false | Bind mounts the host OS `/proc` into the container. | v10.8.0 | v2.48.0
io.{{ $names.company.short }}.features.kernel-modules | false | Bind mounts the host OS `/lib/modules` into the container (i.e. `/lib/modules:/lib/modules`). | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.features.firmware | false | Bind mounts the host OS `/lib/firmware` into the container. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.features.journal-logs | false | Bind mounts journal log directories `/var/log/journal` and `/run/log/journal` aswell as `/etc/machine-id` in read only mode. Required by some logging agents such as `promtail`. Journal logs can be read using libraries such as `sd-journal` in C or `sdjournal` in Go. | v12.0.1 | v2.61.0
io.{{ $names.company.short }}.features.supervisor-api | false | Ensures that `{{ $names.company.allCaps }}_SUPERVISOR_HOST`, `{{ $names.company.allCaps }}_SUPERVISOR_PORT`, `{{ $names.company.allCaps }}_SUPERVISOR_ADDRESS`, and `{{ $names.company.allCaps }}_SUPERVISOR_API_KEY` are added to the container environment variables, so the supervisor API can be used. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.features.{{ $names.company.short }}-api | false | When enabled, it will make sure that `{{ $names.company.allCaps }}_API_KEY` is added to the container environment variables. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.update.strategy | download-then-kill | Set the application [update strategy][update-strategy]. | v7.23.0 | v2.21.0
io.{{ $names.company.short }}.update.handover-timeout | 60000 | Time, in milliseconds, before an old container is automatically killed. Only used with the `hand-over` [update strategy][hand-over]. | v7.23.0 | v2.21.0

\* balenaOS versions that ship with a compatible device supervisor version as per
[balenaOS Changelog](https://github.com/balena-os/meta-balena/blob/master/CHANGELOG.md).

These labels are applied to a specific service with the `labels:` setting:

```yaml
labels:
      io.{{ $names.company.short }}.features.balena-socket: '1'
      io.{{ $names.company.short }}.features.kernel-modules: '1'
      io.{{ $names.company.short }}.features.firmware: '1'
      io.{{ $names.company.short }}.features.dbus: '1'
      io.{{ $names.company.short }}.features.sysfs: '1'
      io.{{ $names.company.short }}.features.procfs: '1'
      io.{{ $names.company.short }}.features.journal-logs: '1'
      io.{{ $names.company.short }}.features.supervisor-api: '1'
      io.{{ $names.company.short }}.features.{{ $names.company.short }}-api: '1'
      io.{{ $names.company.short }}.update.strategy: download-then-kill
      io.{{ $names.company.short }}.update.handover-timeout: ''
```

[update-strategy]:/runtime/update-strategies
[hand-over]:/runtime/update-strategies/#hand-over
