NPM_REGISTRY = ""

install:
	@npm install $(NPM_REGISTRY)

start: install
	@nohup ./node_modules/.bin/pm2 start app.js -i max --name "adminLTE" --max-memory-restart 400M >> logs/pm2_admin.log 2>&1 &

restart: install
	@nohup ./node_modules/.bin/pm2 restart "adminLTE" >> logs/pm2_admin.log 2>&1 &

stop: 
	./node_modules/.bin/pm2 stop app.js
