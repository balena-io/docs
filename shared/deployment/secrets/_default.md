### Build Time only Secret File

To use build secrets, make a subdirectory `.balena` in the root of your repository. Inside that directory, make another
directory named `secrets` and a file named `balena.yml`. Without any secrets, your tree should look like:

```shell
.
├── docker-compose.yml
├── .balena
│   ├── balena.yml
│   └── secrets
├── service1
│   └── Dockerfile.template
└── service2
    └── Dockerfile.template
```

To add a secret file, first add the file to the `.balena/secrets` directory:

```shell
.
├── docker-compose.yml
├── .balena
│   ├── balena.yml
│   └── secrets
│       └── super-secret-recipe
├── service1
│   └── Dockerfile.template
└── service2
    └── Dockerfile.template
```

Now, in the `.balena/balena.yml` file, add the following:

```yaml
build-secrets:
    global:
        - source: super-secret-recipe
          dest: my-recipe
```

This will mount the `super-secret-recipe` file into `/run/secrets/my-recipe` file in every build container. However, the `/run/secrets` folder will not be added to the build context that is sent to the Docker daemon (or balenaEngine),
and therefore:

* The `/run/secrets/` folder will not be present in the image that is deployed to the devices.
* The `COPY` or `ADD` Dockerfile directives will **not** be able to copy files from that folder.
* The folder will be available "for the duration of `RUN` directives", such that secrets can be
  accessed by scripts/code at image build time, for example:

```Dockerfile
RUN cat /run/secrets/my-recipe | secret_processing_script.sh
```

To add a secret file to a specific service's build:

```shell
.
├── docker-compose.yml
├── .balena
│   ├── balena.yml
│   └── secrets
│       ├── super-secret-recipe
│       └── super-secret-recipe-2
├── service1
│   └── Dockerfile.template
└── service2
    └── Dockerfile.template

4 directories, 6 files
```

and balena.yml:

```yaml
build-secrets:
    global:
        - source: super-secret-recipe
          dest: my-recipe
    services:
        service1:
            - source: super-secret-recipe-2
               dest: my-recipe2
```

This will mount the `super-secret-recipe` file as `/run/secrets/my-recipe` for all services, and `super-secret-recipe-2` as `/run/secrets/my-recipe2` for `service1` only. Again, note that the `/run/secrets` folder is only available during the image build, and not present in the image that is deployed to the devices.

Subdirectories are supported in both the source (`.balena/secrets`) and the destination (`/run/secrets`).

__Note:__ Currently `{{$names.company.lower}} build` and `{{$names.company.lower}} deploy` do not support [build time secret files](#build-time-only-secret-file) out of the box and need to be pointed to a [{{$names.engine.lower}}][engine-link] instance. Refer to the [`{{$names.company.lower}} build`][cli-build-reference] and [`{{$names.company.lower}} deploy`][cli-deploy-reference] command references for additional documentation.

### Build variables

It is also possible to define build variables that will be added to your build from the balena.yml file:

```yaml
build-variables:
    global:
        - MY_VAR_1=This is a variable
        - MY_VAR_2=Also a variable
    services:
        service1:
            - SERVICE1_VAR=This is a service specific variable
```

These variables can then be accessed in your Dockerfile through the ARG instruction. For example:

```Dockerfile
FROM balenalib/armv7hf-debian

ARG MY_VAR_1

RUN echo "The build variable is ${MY_VAR_1}"
```

Build variables should **NOT** be used to hold secrets like access tokens or passwords if the Docker image is accessible to untrusted parties, because the Dockerfile ARG instruction may be stored in the image as the [Docker documentation advises](https://docs.docker.com/engine/reference/builder/#arg):

__Warning:__ It is not recommended to use build-time variables for passing secrets like github keys, user credentials etc. Build-time variable values are visible to any user of the image with the docker history command.

However, secrets like tokens and passwords can be used in instructions like RUN through the mounted secret files, for example:

```Dockerfile
RUN /bin/cat /run/secrets/my-recipe | command_that_reads_secrets_from_stdin
```

Files under the .balena folders are not saved in the final image, hence being more secure than ARG.

If you are interested in seeing an example of build time secrets and variables see this [project]({{ $links.githubExamples
}}/example-build-secrets-and-variables). Note this is just a toy project and in a real world setting it is not advisable to commit your
`.balena` secrets folder into the git repository. You should always add it to your `.gitignore` file.
