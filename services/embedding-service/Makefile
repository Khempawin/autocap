VERSION=v1
DOCKERUSER=hush205

build:
	docker build -f Dockerfile -t autocap-embedding-service .

push:
	docker tag autocap-embedding-service $(DOCKERUSER)/autocap-embedding-service:$(VERSION)
	docker push $(DOCKERUSER)/autocap-embedding-service:$(VERSION)
	docker tag autocap-embedding-service $(DOCKERUSER)/autocap-embedding-service:latest
	docker push $(DOCKERUSER)/autocap-embedding-service:latest