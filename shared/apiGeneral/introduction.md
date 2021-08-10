## Introduction

The API is the core of the {{ $names.company.lower }} platform. It provides a secure channel for communication between {{ $names.company.lower }} services and the database. The API's HTTP interface not only informs the dashboard and the CLI, it also gives you the power to directly access resources associated with your account. With the API, you can fetch and update information about your fleets, devices, environment variables and more.

This guide is split into two parts. On this page, you will find a basic tutorial to help you construct API calls. The [Resources][resources] page provides more details about the resources that can be queried using the API, including example calls and a list of available fields.

__Warning:__ When using the API to make changes, take great care in selecting the appropriate resources, as there are *no checks* to prevent you from accidentally making widespread, irreversible mistakes. Test filters with a `GET` call *before* you use them in a `PATCH` or `DELETE` request.

[resources]:/reference/api/resources/application
