all:
	docker-compose up --build -d

build:
	docker-compose down
	docker-compose up --build -d

clean:
	docker-compose down

deps:
	npm install

test: build deps
	npm test
	docker-compose down

.env:
	if [ -f ".env"]; then cp .env .env.bak; fi
	echo "Existing .env file saved to .env.bak"
	rm -f .env
	touch .env
	echo "ADMIN_ADDRESS=0xf8d6e0586b0a20c7" >> .env
	echo "ADMIN_PRIVATE_KEY=91a22fbd87392b019fbe332c32695c14cf2ba5b6521476a8540228bdf1987068" >> .env
	echo "ENCRYPTION_KEY=faae4ed1c30f4e4555ee3a71f1044a8e" >> .env
	echo "POSTGRES_DB=wallet" >> .env
	echo "POSTGRES_USER=wallet" >> .env
	echo "POSTGRES_PASSWORD=wallet" >> .env
