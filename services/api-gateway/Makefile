VERSION=v1
DOCKERUSER=hush205

build:
	docker build -f Dockerfile -t autocap-api-gateway .

push:
	docker tag autocap-api-gateway $(DOCKERUSER)/autocap-api-gateway:$(VERSION)
	docker push $(DOCKERUSER)/autocap-api-gateway:$(VERSION)
	docker tag autocap-api-gateway $(DOCKERUSER)/autocap-api-gateway:latest
	docker push $(DOCKERUSER)/autocap-api-gateway:latest