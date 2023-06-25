# BookStore API

## Requirements

- NodeJS v14 is at least required to serve this API, although it was developed using NodeJS v18 which is more recommended.
- NPM
- MYSQL

## Building
This step is recommended for production environment.

``` npm run build ```

Create and adjust .env file to the "build" directory.

## Installation
Clone repo, then run the following command:

``` npm update ```

Create and adjust .env file accordingly, then run the following commands:

``` node ace migration:run ```

``` node ace db:su ```

## Running
For running in production environment (after building bookstore-api) you have to run the following commands:

``` cd build ```
``` npm ci --production ```
``` node server.js ```

To run bookstore-api without performing a build, you need to run the following command:

``` node ace serve ```

## Docker
To build docker image, make sure to use the following command at the project's root folder level:

``` docker image build --no-cache --tag <desired-image-tag> ./ ```

You may perform a clean database migration prior to launching a container by calling the following commands:

``` node ace migration:fresh ```

``` node ace db:su ```

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
