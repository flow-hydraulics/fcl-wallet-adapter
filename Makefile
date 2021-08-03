all:
	docker-compose up --build -d

build:
	docker-compose down
	docker-compose up --build -d

deps:
	npm install

test: build deps
	npm test
	docker-compose down
