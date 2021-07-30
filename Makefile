all:
	echo 'not implemented yet'

test:
	docker-compose up --build -d
	npm test
	docker-compose down
