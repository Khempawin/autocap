VERSION=v1
DOCKERUSER=hush205

build:
	docker build -f Dockerfile -t autocap-index-service .

push:
	docker tag autocap-index-service $(DOCKERUSER)/autocap-index-service:$(VERSION)
	docker push $(DOCKERUSER)/autocap-index-service:$(VERSION)
	docker tag autocap-index-service $(DOCKERUSER)/autocap-index-service:latest
	docker push $(DOCKERUSER)/autocap-index-service:latest