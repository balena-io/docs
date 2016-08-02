FROM library/node:6.3

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

# npm install needs to run after the COPY because of postinstall deps.
RUN npm install --unsafe-perm --allow-root \
	&& npm cache clean \
	&& node_modules/bower/bin/bower --allow-root cache clean

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
