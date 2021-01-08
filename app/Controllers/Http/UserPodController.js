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

    const search = await UserPod
      .query()
      .where({
        'user_id': params.user_id,
        'pod_id': params.pod_id
      })
      .fetch()

    if (!!search && search.size()) {
      return response.status('409').json('Association already exists')
    }

    const pod = await Pod.findOrFail(params.pod_id)

    params.auto_like = pod.auto_like
    params.auto_comment = pod.auto_comment

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
    const { user_id, id } = request.params

    await UserPod
      .query()
      .where({
        'user_id': user_id,
        'pod_id': id
      })
      .delete()
  }

}

module.exports = UserPodController