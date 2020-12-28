'use strict'

const Route = use('Route')

Route.group('Authentication', () => {
  Route.post('login', 'AuthController.login')
  Route.get('me', 'AuthController.me').middleware('auth')
}).prefix('auth')

Route
  .post('sign-up', 'UserController.store')

Route
  .resource('user', 'UserController')
  .only(['index', 'store', 'show', 'update', 'destroy'])
  .middleware('auth')