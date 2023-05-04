---
title: Inspect device history
excerpt: What state was a device in when and who set it to this state
---

# Device History

The **device history** on the other hand centers around the device and serves the state of a device, the period of time this state was valid and who initiated this device state and who ended this device state - in short: **What state was a device in when and who set it to this state**.
This representation makes it easy to review and investigate in what state a device was during a questioned point in time. It does not serve the information how the change of the device state was performed, like if it was caused from a user interaction through balena Dashboard, or if it was performed by a balena cli call. 
In balena Cloud users, devices and applications are assigned to unique actors that interact with the balena API. As every change to a device state can only be caused by a request to the balena API and every request must have an assigned actor, the device history tracks the actor for each start and end of a state.

## balena dashboard
In the balena dashboard the device history is located at two locations. First in the context of one single device serving the device history entries for this specific device and second in the context of one fleet serving all device history entries for all devices of this specific fleet. 
![Overview of the device history for one device](/img/common/device-history/device-history-device-summary-overview.png)

### Filtering device history
As the device history is a full featured OData resource it's filterable as any other table view in the balena dashboard.
![Overview of the device history for one device filtered by release](/img/common/device-history/device-history-device-summary-filter-release.png)
![Overview of the device history for one device filtered by time frame](img/common/device-history/device-history-device-summary-filter-time.png)

### Interpretation of user expansion
The dashboard will expand any actor to either the user, the device or the application. In case of the user the user name will be shown, in the case of a device the 7digit UUID is resolved and in case of an application the application slug is resolved. 

### Interpretation of device history entries
The device history for a single device is a consecutive list of entries that continues to grow until the device is deleted or moved out of the users permissions. In the case of a deleting the last entry has an valid datetime for the field `end_timestamp` and no other existing entry with an empty `end_timestamp`. In the case of a device movement into an application that the user has no access to, the last visible entry will also have a valid datetime for `end_timestamp` as this is the last device state change before the device is moved into the other fleet. The device itself is still existing, but the user can only access device history entries for the time in that the device belonged to the users application.

### Lookback time period
Every user of balena cloud has access to the device history and for every plan specific look back time frames apply. The look back time for enterprise plans is 90 days, for production plans 30 days and for all other plans 24 hours. The look back time frame is applied to the creation date time `created_at` field of the device history entry. If an device history state entry is created before the look back time and is still valid (end_timestamp is not set) the entry is served. 

## balena API - device history resource
The device history is a full featured OData resource on the balena API so that it can be queried by it's resource name `device_history` for the API version `v6` (https://api.balena-cloud.com/v6/) and higher. Thus, the device history can be evaluated with sophisticated filters, expansions and selections of fields, as every other OData resource provided by the balena API.
### Sample balena API OData queries
The following example query gets the properties `uuid`, `tracks__device` and `is_created_by__actor`. The query expands on `is_created_by__actor` to retrieve the user object that is linked to this entry by it's actor. The query expands the `tracks__device` to get the device information. In the case of deleted device or user the expansions will deliver an empty reply.
```curl
https://api.balena-cloud.com/v6/device_history?\$select=uuid,tracks__device,is_created_by__actor&\$expand=tracks__device,is_created_by__actor(\$expand=is_of__user)
```

The following example query gets the properties `uuid`, `tracks__device` and `is_created_by__actor`. The query expands on `is_created_by__actor` to retrieve the user object that is linked to this entry by it's actor. The query expands the `tracks__device` to get the device information. In the case of deleted device or user the expansions will deliver an empty reply.
```curl
https://api.balena-cloud.com/v6/device_history?\$select=uuid,tracks__device,is_created_by__actor&\$filter=uuid%20eq%20'<DEVICE_UUID>'&\$expand=tracks__device,is_created_by__actor(\$expand=is_of__user)
```

### Device History Model Interface

```typescript
DeviceHistory {
    created_at: DateString;
    modified_at: DateString;
    id: number;
    end_timestamp: DateString | null;
    is_created_by__actor: { __id: number } | [Actor?] | null;
    is_ended_by__actor: { __id: number } | [Actor?] | null;
    tracks__device: { __id: number } | [Device?] | null;
    tracks__actor: { __id: number } | [Actor?] | null;
    uuid: string | null;
    belongs_to__application: { __id: number } | [Application?] | null;
    is_active: boolean;
    is_running__release: { __id: number } | [Release?] | null;
    should_be_running__release: { __id: number } | [Release?] | null;
    api_heartbeat_state: 'online' | 'offline' | 'timeout' | 'unknown';
    is_connected_to_vpn: boolean;
    is_managed_by__service_instance: { __id: number } | [ServiceInstance?] | null;
    os_version: string | null;
    os_variant: string | null;
    supervisor_version: string | null;
    is_of__device_type: { __id: number } | [DeviceType?] | null;
    cpu_id: string | null;
    should_be_managed_by__release: { __id: number } | [Release?] | null;
}
```
