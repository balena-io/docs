FROM library/node:latest

RUN mkdir /src
WORKDIR /src

COPY package.json .
RUN npm install

COPY . .
RUN tools/prepare.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
