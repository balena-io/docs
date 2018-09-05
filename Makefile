IMAGE=resin/docs:latest

all: build

build:
	docker build -t ${IMAGE} .

run: build
	docker run -it --rm \
		-p 3000:3000 \
		${IMAGE}

shell: build
	docker run -it --rm
	--entrypoint /bin/bash
	${IMAGE}

