FROM library/node:6.3

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

RUN node_modules/bower/bin/bower --allow-root install \
	&& tools/prepare.sh

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]

