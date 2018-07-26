Label | Default | Description
--- | --- | ---
io.{{ $names.company.short }}.features.balena-socket | false | Bind mounts the balena container engine socket into the container
io.{{ $names.company.short }}.features.dbus | false | Bind mounts the host OS dbus into the container using `/run/dbus:/host/run/dbus`
io.{{ $names.company.short }}.features.kernel-modules | false | Bind mounts the host OS `/lib/modules` into the container. (i.e. `/lib/modules:/lib/modules`)
io.{{ $names.company.short }}.features.firmware | false | Bind mounts the host OS `/lib/firmware` into the container
io.{{ $names.company.short }}.features.supervisor-api | false | Ensures that `{{ $names.company.allCaps }}_SUPERVISOR_HOST`, `{{ $names.company.allCaps }}_SUPERVISOR_PORT`, `{{ $names.company.allCaps }}_SUPERVISOR_ADDRESS`, and `{{ $names.company.allCaps }}_SUPERVISOR_API_KEY` are added to the container environment variables, so the supervisor API can be used. (Currently will only work for services that have `network_mode` = `host` or `bridge` )
io.{{ $names.company.short }}.features.{{ $names.company.short }}-api | false | When enabled, it will make sure that `{{ $names.company.allCaps }}_API_KEY` is added to the container environment variables
io.{{ $names.company.short }}.update.strategy | download-then-kill | Set the application [update strategy][update-strategy]
io.{{ $names.company.short }}.update.handover-timeout | 60000 | Time, in milliseconds, before an old container is automatically killed. Only used with the `hand-over` [update strategy][hand-over].

[update-strategy]:/runtime/update-strategies
[hand-over]:/runtime/update-strategies/#hand-over