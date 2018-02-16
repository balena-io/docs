Label | Default | Description
--- | --- | ---
io.resin.features.dbus | false | Bind mounts the host OS dbus into the container using “/run/dbus:/host/run/dbus”
io.resin.features.kernel-modules | false | Bind mounts the host OS /lib/modules into the container. (i.e. “/lib/modules:/lib/modules”)
io.resin.features.firmware | false | Bind mounts the host OS /lib/firmware into the container
io.resin.features.supervisor-api | false | Ensures that RESIN_SUPERVISOR_HOST, RESIN_SUPERVISOR_PORT, RESIN_SUPERVISOR_ADDRESS, and RESIN_SUPERVISOR_API_KEY are added to the container environment variables, so the supervisor API can be used. (Currently will only work for services that have network_mode = “host” or “bridge” )
io.resin.features.resin-api | false | When enabled, it will make sure that RESIN_API_KEY is added to the container environment variables
io.resin.update.strategy | download-then-kill | 
io.resin.update.handover-timeout | | 