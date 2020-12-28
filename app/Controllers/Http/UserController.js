'use strict'

const Route = use('Route')
const User = use('App/Models/User')

class UserController {

  async index({ request, response }) {
    const { name } = request.all()

    const user = await User.all()

    return response.status('200').json(user)
  }

  async store({ request, response }) {
    const params = request.post()

    const user = await User.create(params)
    await user.reload()

    return response.status('201').json(user)
  }

  async show({ request }) {
    const { id } = request.params

    return User.findOrFail(id)
  }

  async update({ request, auth }) {
    const attributes = request.post()
    let user = await User.findOrFail(attributes.id)

    user.merge(attributes)
    await user.save()

    return user
  }

  async destroy({ request, auth }) {
    const { id } = request.params
    const user = await User.findOrFail(id)

    await user.delete()
  }

}

module.exports = UserController