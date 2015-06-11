# Environment Variables

Environment variables allow you to provide runtime configuration to your application which can be updated without having to modify your source code.

You can use them to keep secrets and other sensitive values out of your code base.

Resin provides two kinds of environment variables application-wide and per-device.

## Application-wide Environment Variables

Environment variables defined on the application level are available to the code on any device running this application — unless they are _redefined_ with the per-device environment variable of the same name.

## Per-device Environment Variables

Per-device environment variables are availabe to the code running on the particular device. If both the application and the device have environment variable _of the same name_, the code on this device will see the value of the _per-device environment variables._ In other words, per-device environment variable redefines (or overrdides) application-wide environment variable of the same name.

It's important to understand that the device environment variable _doesn't have to_ correspond to some application-wide environment variable.

## Managing Environment Variable from the Application Page

![Application Page](/img/env-vars/app.jpg)

The application page has an "Environment variables" tab containing the list of all application-wide environment variables.

You can delete the variables or edit them here (just edit the value, it will be saved automatically).

Each variable row in the list has an expandable region where you see per-device redefines of this variable, can edit, reset them (the Reset button deletes the redefining per-device variable which automatically makes the appliction-wide variable seen by the device), or add a new redefine by choosing one of the remaining devices from the drop-down selector.

> _Note_ that deleting an application-wide variable **will not** delete any of its device-specific redefines.

Below the list there's a form for creating a new environment variable.

Finally, if there are ny device-specific variables that **are not** application-wide variables' redefines (i.e. don't have an application-wide variable of the same name) they will be shown at the bottom of the page.

> _Note_. These variables are _only_ visible to the devices where they are defined.

There's a convenience Define buton that will allow you creating the application-wide variable of the same name that will serve as default for all the devices of this application.

The counter next to the variable name shows the number of devices that have this variable defined. Clicking on it will reveal the full list of these devices.

## Managing Environment Variable from the Device Page

![Device Page](/img/env-vars/device.jpg)

The device page also has the "Environment variables" tab. It's slightly more complicated than the application page and consists of 4 sections:
1. the list of this particular device's environment variables
1. the form for creating a new variable
1. the list of other variables from the device's application
1. the list of other variables defined for other devices of this application (but not for this device and not for the application).

The _first list_ (device environment variables) is pretty straightforward. You can edit variables' values, or delete them.

> _Note_ that redefines (the variables that match the application-wide variable by name) are identified and their deleton button reads "Reset". That's because when you delete the redefine the variable is still defined on the application level, and that value becomes unmasked and visible to the code running on your device.

The _second form_ (new variable) is straightforward as well, you type the name and value and save it. The name field has autosuggest feature based on the variables from the third list.

The _third list_ (application variables) is pretty usable because it gives you comprehensive understanding of which variables are actually visible to the code on this device. It shows all the _remaining_ application-wide variables — those that are not redefined for this device. There's also a convenience Redefine button should you want to redefine some of them.

The fourth list gives you an idea of specific variables defined for other application's devices. It's the same as the on on the application page.

> _Note_ that these variables **are not** visible to this device. We show them in case you want to define the same variable for the device.
