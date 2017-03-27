IMAGE=resin/docs

all: build

build:
	docker build -t ${IMAGE}:latest .

run: build
	docker run -it --rm \
		-p 3000:3000 \
		${IMAGE}:latest

shell: build
	docker run -it --rm
	--entrypoint /bin/bash
	${IMAGE}:latest

test: build

