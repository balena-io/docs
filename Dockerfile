FROM library/node:latest

RUN mkdir /src
WORKDIR /src

COPY . .
RUN npm install

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
