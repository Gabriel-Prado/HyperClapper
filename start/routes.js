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

Route
  .resource('user.post', 'UserPostController')
  .only(['index'])
  .middleware('auth')

Route
  .resource('user.pod', 'UserPodController')
  .only(['index', 'destroy', 'store', 'update'])
  .middleware('auth')

Route
  .resource('comment', 'CommentController')
  .only(['index', 'store', 'show', 'update', 'destroy'])
  .middleware('auth')

Route
  .resource('pod', 'PodController')
  .only(['index', 'store', 'show', 'update', 'destroy'])
  .middleware('auth')

Route
  .resource('post', 'PostController')
  .only(['index', 'store', 'show', 'update', 'destroy'])
  .middleware('auth')