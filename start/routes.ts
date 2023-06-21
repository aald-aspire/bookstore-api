/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  
})

const api_version = 'v1'

Route.group(() => {
  
  Route.group(() => {

    Route.post('/login', 'UsersController.login').as('login')

    Route.group(() => {

      Route.post('/logout', 'UsersController.logout').as('logout')
      Route.post('/add', 'UsersController.add').as('add')

    }).middleware('auth')

  }).prefix('/users').as('users')

  Route.group(() => {

    Route.get('/', 'AuthorsController.index').as('index')
    Route.get('/:id', 'AuthorsController.show').as('show')
    Route.post('/', 'AuthorsController.add').as('add')

    Route.group(() => {
      Route.put('/:id', 'AuthorsController.edit').as('edit')
      Route.delete('/:id', 'AuthorsController.remove').as('remove')
    }).middleware('rbac:admin')

  }).prefix('/authors').middleware('auth').as('authors')

  Route.group(() => {
      
      Route.get('/', 'BooksController.index').as('index')
      Route.get('/:id', 'BooksController.show').as('show')
      Route.post('/', 'BooksController.add').as('add')

      Route.group(() => {
        Route.put('/:id', 'BooksController.edit').as('edit')
        Route.delete('/:id', 'BooksController.remove').as('remove')
      }).middleware('rbac:admin')

  }).prefix('/books').middleware('auth').as('books')

}).prefix('/api/' + api_version)