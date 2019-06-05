# 
# This Dockerfile can be useful on macOS (perhaps Windows too), where the
# the ./tools/build.sh script fails to run because of doxx memory issues:
# 
#     balena-io/docs/node_modules/@resin.io/doxx/doxx.js:16
#         throw err
#         ^
#     RangeError: Maximum call stack size exceeded
# 
# The error does not happen on Linux, or in a `node` Docker container.
# 
# This Dockerfile assumes that you bind mount a `docs` repo clone (cloned
# to your laptop, outside the container) to the container's /src folder,
# as follows:
# 
# docker build -t docs -f Dockerfile.bindmount .
# docker run -itp 3000:3000 -v "$PWD":/src docs
# 
# For more interactive use, execute /bin/bash instead of the default CMD,
# then manually run the npm commands in the container:
# 
# docker run -itp 3000:3000 -v "$PWD":/src docs /bin/bash
#     $ npm i --unsafe-perm
#     $ npm start
# 
# Then visit http://localhost:3000/docs/
# 
# I hear you ask: why not just clone the `docs` repo in a Linux container
# instead of bind mounting it? Well, it's because of the small things when
# it comes to issuing the 'git push' command:
#     ~/.gitconfig (with my name, e-mail address...)
#     ~/.ssh/id_rsa (ssh key registered with GitHub)
#     ~/.bashrc with my functions and settings
#     ...
# Besides, using this Dockerfile is not mandatory! :-)
# 
FROM node:latest
EXPOSE 3000
RUN mkdir /src
WORKDIR /src
CMD npm install --unsafe-perm && npm start
