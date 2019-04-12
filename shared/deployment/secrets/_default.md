### Build Time only Secret File

To use build secrets, make a subdirectory `.balena` in the root of your repository. Inside that directory, make another 
directory named `secrets` and a file named `balena.yml`, without any secrets, your tree should look like
```
[19:48] ➜  project tree -a
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

to add a secret file, first add the file to the `.balena/secrets` directory:
```
[19:49] ➜  project tree -a
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

now, in the `.balena/balena.yml` file, add the following to mount that secret into every service:
```
build-secrets:
    global:
        - source: super-secret-recipe
          dest: my-recipe   
```
This will mount the `super-secret-recipe` file into `/run/secrets/my-recipe` file in every build container.

To add a secret file to a specific service's build:
```
[19:53] ➜  project tree -a
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
```
build-secrets:
    global:
        - source: super-secret-recipe
          dest: my-recipe
    services:
        service1:
            - source: super-secret-recipe-2
               dest: my-recipe2
```
and that will mount both the global and the service1 specific secret into `/run/secrets` as `my-recipe2`.

Subdirectories are supported in both the source (`.balena/secrets`) and the destination (`/run/secrets`)

### Build variables

It is also possible to define build variables which will be added to your build from the balena.yml file:

```yaml
build-variables:
    global:
        - MY_VAR_1=This is a variable
        - MY_VAR_2=Also a variable
    services:
        service1:
            - SERVICE1_VAR=This is a service specific variable
```

These will be added as build args to your builds, so for example, to read it in your build:

```Dockerfile
FROM balenalib/armv7hf-debian

ARG MY_VAR_1

RUN echo "The build variable is ${MY_VAR_1}"
```

Build variables should **NOT** be used to hold secrets like access tokens or passwords if the docker image is accessible to untrusted parties, because the Dockerfile ARG instruction may be stored in the image as the Docker documentation advises:

>https://docs.docker.com/engine/reference/builder/#arg
Warning: It is not recommended to use build-time variables for passing secrets like github keys, user credentials etc. Build-time variable values are visible to any user of the image with the docker history command.

However, secrets like tokens and passwords can be used in instructions like RUN through the mounted secret files, for example:

```
RUN /bin/cat /run/secrets/my-recipe/secret-recipe | command_that_reads_secrets_from_stdin
```
Files under the .balena folders are not saved in the final image, hence being more secure than ARG.

If you are interested in seeing an example of build time secrets and variables have a play around with this [project](https://github.com/balena-io-projects/example-build-secrets-and-variables). Note this is just a toy project and in a real world setting it is not advisable to commit your `.balena` secrets folder into the git repository. You should always add it to your `.gitignore` file.