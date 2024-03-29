# export vars from root env file
ifneq (,$(wildcard ./.env))
	include .env
	export
endif

build:
	docker-compose pull
	docker-compose up --build -d

clean:
	docker-compose down
	rm -rf node_modules

rebuild: clean build
	cd example && flow accounts create --key $(PROFILE_CONTRACT_PUBLIC_KEY)
	cd example && flow project deploy

node_modules:
	npm install

test: rebuild node_modules
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
	echo "WALLET_HOST=localhost" >> .env
	echo "WALLET_PORT=3000" >> .env
