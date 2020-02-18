install:
	npm install
build:
	rm -rf dist
	npm run build
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm run test
test-coverage:
	npm test -- --coverage
.PHONY: test