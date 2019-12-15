install:
	npm install
start:
	npx babel-node src/bin/gendiff
publish:
	npm publish --dry-run
lint:
	npx eslint .