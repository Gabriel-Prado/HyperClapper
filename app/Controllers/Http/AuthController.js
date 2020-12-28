'use strict'

const User = use('App/Models/User')

class AuthController {

  async login({ request, auth, response }) {
    const { email, password } = request.post()
    const { token } = await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)

    return { token: `Bearer ${token}` }
  }

  async me({ auth }) {
    return auth.user
  }

}

module.exports = AuthController