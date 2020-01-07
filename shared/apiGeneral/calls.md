## Constructing API calls

The {{ $names.company.lower }} API uses the Open Data Protocol ([OData][odata]), which defines a standard set of tools for querying and modifying structured data. To help you get started, we'll go over some of the most common requests, but when you're ready to build more advanced API calls make sure to consult the [OData documentation][odata-docs].

To construct an API call, it helps to understand a little about how the underlying data is structured. The {{ $names.company.lower }} data model consists of a number of connected resources. Resources include devices, applications, users, and more. When you make an API call, you are asking to either view, create, modify, or remove a resource. The *method* of the API call corresponds to the action you are trying to take:

- **GET:** view information about a resource
- **POST:** create a new resource
- **PATCH:** modify an existing resource
- **DELETE:** remove a resource

Knowing the resource you wish to act upon and the method you wish to act with is enough for some requests. For example, if you want to view all applications you have access to, you can use the `GET` method and the `application` resource. Your API call would look like this:

```
curl -X GET "{{ $links.apiBase }}/v5/application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Depending on the number of applications you have access to, this could return much more information than you need. There are two query methods that could help you with this: `$select` and `$filter`.

`$select` specifies which fields to return for each resource. By default, every field comes back as part of the response, but most use cases require only one or two of these pieces of information.

The following API call uses `$select` to only return the name and device type for each application:

```
curl -X GET
"{{ $links.apiBase }}/v5/application?\$select=app_name,device_type" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

In some cases, you'll want to get information for one specific resource, rather than all resources of that type. If you happen to know the resource ID, you can simply append it to the resource name:

```
curl -X GET "{{ $links.apiBase }}/v5/device(<ID>)" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Many times, however, you won't know the internal ID used by the API, and you'll want to use some other piece of information to find the appropriate resource. In these cases, you can use the `$filter` method to select resources based on any field. For example, if you are looking for a specific device, it's more likely that you'll have the device UUID than the device ID:

```
curl -X GET \
"{{ $links.apiBase }}/v5/device?\$filter=uuid%20eq%20'<UUID>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

Notice the construction here: `$filter=` is used to define the field, and then the value is specified after the `eq` keyword. This is the most straightforward example—there are many other ways to build filters, which you can find in the OData documentation.

A final tip for constructing API calls: for some of the fields in the API response, a link to another resource is provided rather than the complete information about that resource. For example, if you make a call requesting information about a specific device, the `belongs_to__application` field will return a link to an application, but not all the information about that application. To get all the fields for the application resource, you can use the `$expand` method:

```
curl -X GET \
"{{ $links.apiBase }}/v5/device?\$filter=uuid%20eq%20'<UUID>'&\$expand=belongs_to__application" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

It's also possible to filter on a field that belongs to a linked resource. To find all devices belonging to an application by that application's name, you would construct your query like this:

```
curl -X GET \
"{{ $links.apiBase }}/v5/device?\$filter=belongs_to__application/app_name%20eq%20'<APP_NAME>'" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <AUTH_TOKEN>"
```

[odata]:http://www.odata.org/
[odata-docs]:http://www.odata.org/getting-started/basic-tutorial/
