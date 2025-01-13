---
title: Overview
---

# {{ title }}

The API is the core of the {{ $names.company.lower }} platform. It provides a secure channel for communication between {{ $names.company.lower }} services and the database. The API's HTTP interface not only informs the dashboard and the CLI, it also gives you the power to directly access resources associated with your account. With the API, you can fetch and update information about your fleets, devices, environment variables and more.

This guide is split into two parts. On this page, you will find a basic tutorial to help you construct API calls. The [Resources][resources] page provides more details about the resources that can be queried using the API, including example calls and a list of available fields.

__Warning:__ When using the API to make changes, take great care in selecting the appropriate resources, as there are *no checks* to prevent you from accidentally making widespread, irreversible mistakes. Test filters with a `GET` call *before* you use them in a `PATCH` or `DELETE` request.

## Versioning

When a new version of the API is released, calls to old versions of the API will still work. The API is currently on v7, but v1, v2, v3, v4, v5 and v6 calls are translated to the equivalent calls in the newest version.

## Authentication

API requests are authorized using [session tokens][tokens] or [named API keys][api-keys]. To authenticate with either type of authentication token, make sure to include `Authorization: Bearer <auth token>` as a header in your API call.

## Constructing API calls

The {{ $names.company.lower }} API uses the Open Data Protocol ([OData][odata]), which defines a standard set of tools for querying and modifying structured data. To help you get started, we'll go over some of the most common requests, but when you're ready to build more advanced API calls make sure to consult the [OData documentation][odata-docs].

To construct an API call, it helps to understand a little about how the underlying data is structured. The {{ $names.company.lower }} data model consists of a number of connected resources. Resources include devices, fleets, users, and more. When you make an API call, you are asking to either view, create, modify, or remove a resource. The *method* of the API call corresponds to the action you are trying to take:

- **GET:** view information about a resource
- **POST:** create a new resource
- **PATCH:** modify an existing resource
- **DELETE:** remove a resource

Knowing the resource you wish to act upon and the method you wish to act with is enough for some requests. For example, if you want to view all fleets you have access to (which includes public fleets), you can use the `GET` method and the `application` resource. Your API call would look like this:

```shell
curl -X GET "{{ $links.apiBase }}/v7/application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Depending on the number of fleets you have access to, this could return much more information than you need. There are two query methods that could help you with this: `$select` and `$filter`.

`$select` specifies which fields to return for each resource. By default, every field comes back as part of the response, but most use cases require only one or two of these pieces of information.

The following API call uses `$select` to only return the name, slug and device type id for each application:

```shell
curl -X GET "{{ $links.apiBase }}/v7/application?\$select=app_name,slug,is_for__device_type" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

In some cases, you'll want to get information for one specific resource, rather than all resources of that type. If you happen to know the resource ID, you can simply append it to the resource name:

```shell
curl -X GET "{{ $links.apiBase }}/v7/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

This also works for other pieces of unique information as long as you specify them, eg the device uuid for devices:

```shell
curl -X GET "{{ $links.apiBase }}/v7/device(uuid='<UUID>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

or for resources where multiple elements combine to be unique, eg for device tags the device and tag key are a unique combination:

```shell
curl -X GET "{{ $links.apiBase }}/v7/device(device=<DEVICE ID>,tag_key='<KEY>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```


Many times, however, you won't know the internal ID or other unique info used by the API, and you'll want to use some other piece of information to find the appropriate resource. In these cases, you can use the `$filter` method to select resources based on any field. For example, if you are looking for a specific device, it may be you have neither the ID nor UUID but you do know the name:

```shell
curl -X GET \
"{{ $links.apiBase }}/v7/device?\$filter=name%20eq%20'<DEVICE NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Notice the construction here: `$filter=` is used to define the field, and then the value is specified after the `eq` keyword. This is the most straightforward example—there are many other ways to build filters, which you can find in the OData documentation.

It's also possible to filter on a field that belongs to a linked resource. To find all devices belonging to an application by that application's slug, you would construct your query like this:

```shell
curl -X GET \
"{{ $links.apiBase }}/v7/device?\$filter=belongs_to__application/any(a:a/slug%20eq%20'<APP_SLUG>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Similarly it's also possible to find all applications belonging to a specific organization based on that organization's handle, with a query like this:

```shell
curl -X GET \
"{{ $links.apiBase }}/v7/application?\$filter=organization/any(o:o/handle%20eq%20'<ORG_HANDLE>')" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

If you want to extend this to return all fleets that are related with the authenticated user across all organizations that it is a member of, you can then use a `$filter` on the `is_directly_accessible_by__user` property. For example:

```shell
curl -X GET "{{ $links.apiBase }}/v7/application?\$filter=is_directly_accessible_by__user/any(dau:true)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```


A final tip for constructing API calls: for some of the fields in the API response, a link to another resource is provided rather than the complete information about that resource. For example, if you make a call requesting information about a specific device, the `belongs_to__application` field will return a link to an application, but not all the information about that application. To get all the fields for the application resource, you can use the `$expand` method:

```shell
curl -X GET \
"{{ $links.apiBase }}/v7/device(uuid='<UUID>')?\$expand=belongs_to__application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Similarly we can extend our earlier API call that retrieves all applications to also include their device type slug by using a `$expand`:
```shell
curl -X GET \
"{{ $links.apiBase }}/v7/application?\$select=app_name,slug&\$expand=is_for__device_type(\$select=id,slug)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

## Rate limits

We intentionally do not publish detailed rate limits or the inner workings of our rate-limiting algorithm. Our goal is to keep the API experience as seamless as possible. 

Engineers using our API shouldn’t have to manage the complexity of rate limits to automate workflows effectively. The rate limits we enforce are generous, and customers running large-scale automation rarely encounter issues.

Publishing specific rate limits often results in them being treated as a "target" or a fixed barrier, which is not how we intend the API to be used. Our rate limits are designed to provide a minimum level of protection for the API and to ensure consistent performance for all users, without requiring customers to worry about exceeding them.

To maintain the best experience, we also need the flexibility to adapt and evolve the rate-limiting algorithm. Publishing fixed limits could constrain our ability to improve and respond to specific needs without disrupting customers. 

Instead, we provide the `Retry-After` header. The HTTP `Retry-After` response header indicates how long the user agent should wait before making a follow-up request. When a request exceeds the current rate limit, the response will include this header with a value indicating how long you should be waiting before retrying. This ensures your code can dynamically adapt on runtime without needing workarounds or context about the rate-limiting mechanism.


[odata]:https://www.odata.org/
[odata-docs]:https://www.odata.org/getting-started/basic-tutorial/
[resources]:/reference/api/resources/fleet
[tokens]:/learn/accounts/account#session-tokens
[api-keys]:/learn/accounts/account#api-keys

