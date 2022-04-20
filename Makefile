.PHONY: autoformat build dev clean deploy timefile
export PATH := ./node_modules/.bin:$(PATH)

dev: node_modules src/data.json
	webpack-dev-server --mode development --progress
clean:
	rm -rf dist node_modules src/data.json src/buildtime.json


autoformat: node_modules
	yamlfix config.yaml
	prettier -w src/**/*.js src/**/*.json src/**/*.pug *.js


src/data.json: config.yaml prepareData.php
	php prepareData.php > src/data.json
build: node_modules src/data.json timefile
	NODE_ENV=production webpack build --mode production --progress
package-lock.json: package.json
	npm i
	touch node_modules
	touch package-lock.json


node_modules: package.json package-lock.json
	npm i
	touch node_modules
deploy: clean autoformat build
	cp config.yaml dist/
	echo rsync -rv --delete dist/* ${DEPLOYMENT_TARGET}

timefile:
	date '+"%Y-%m-%d %H:%M:%S"' > src/buildtime.json

