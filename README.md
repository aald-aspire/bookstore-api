# BookStore API

## Requirements

- NodeJS v14 is at least required to serve this API, although it was developed using NodeJS v18 which is more recommended.
- NPM
- MYSQL

## Installation
Clone repo, then run the following command:

``` npm update ```

Create and adjust .env file accordingly, then run the following commands:

``` node ace migration:run ```

``` node ace db:su ```

## Running
``` node ace serve ```

## Testing
Recommended step (WARNING: PERFORMING THIS WILL WIPE THE DATABASE)

``` node ace migration:fresh ```

``` node ace db:su ```

Start the tests:

``` npm run test ```

In case you need to run the full testing suite and avoid failed tests, you have to remove the "run-failed-tests" Japa cache by calling:

``` rm -f node_modules/.cache/@japa/run-failed-tests ```

## Docs (Swagger)
Swagger-generated documentation can be reached any time, usually by accessing "docs/swagger.json" or by visiting <api-root-host>/docs/ on a live instance of the api
