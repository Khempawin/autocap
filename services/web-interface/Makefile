VERSION=v1
DOCKERUSER=hush205

build:
	docker build -f Dockerfile -t autocap-web-interface .

push:
	docker tag autocap-web-interface $(DOCKERUSER)/autocap-web-interface:$(VERSION)
	docker push $(DOCKERUSER)/autocap-web-interface:$(VERSION)
	docker tag autocap-web-interface $(DOCKERUSER)/autocap-web-interface:latest
	docker push $(DOCKERUSER)/autocap-web-interface:latest