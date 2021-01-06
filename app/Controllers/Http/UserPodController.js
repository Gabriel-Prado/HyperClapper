'use strict'

const Pod = use('App/Models/Pod')
const UserPod = use('App/Models/UserPod')

class UserPodController {

  async index({ request, response }) {
    const { search } = request.all()
    const { user_id } = request.params

    let pods = Pod
      .query()
      .with('users')
      .whereHas('users', builder => {
        builder.where('user_id', user_id)
      })

    if (!!search) {
      pods.where(builder => {
        builder.where('name', 'like', `%${search}%`)
        builder.orWhere('description', 'like', `%${search}%`)
      })
    }

    pods = await pods.fetch()

    return response.status('200').json(pods)
  }

  async store({ request, response }) {
    const params = request.post()

    params.auto_like = true;
    params.auto_comment = true;

    const userPod = await UserPod.create(params)
    await userPod.reload()

    return response.status('201').json(userPod)
  }

  async update({ request, auth }) {
    const attributes = request.post()
    const { user_id, id } = request.params

    let userPod = await UserPod.findOrFail(id)

    userPod.merge(attributes)
    await userPod.save()

    return userPod
  }

  async destroy({ request, auth }) {
    const { id } = request.params
    const userPod = await UserPod.findOrFail(id)

    await userPod.delete()
  }

}

module.exports = UserPodController