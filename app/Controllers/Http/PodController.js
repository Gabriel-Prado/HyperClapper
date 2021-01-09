'use strict'

const Route = use('Route')
const Pod = use('App/Models/Pod')
const UserPod = use('App/Models/UserPod')

class PodController {

  async index({ request, response }) {
    const { search } = request.all()

    const pod = !!search ?
      await Pod.query().where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`).fetch() :
      await Pod.all()

    return response.status('200').json(pod)
  }

  async store({ request, response }) {
    const params = request.post()

    const pod = await Pod.create(params)
    await pod.reload()

    await UserPod.create({
      user_id: pod.created_by,
      pod_id: pod.id,
      auto_like: pod.auto_like,
      auto_comment: pod.auto_comment
    })

    return response.status('201').json(pod)
  }

  async show({ request }) {
    const { id } = request.params

    const pod = await Pod.findOrFail(id)

    await pod.load('users')
    await pod.load('posts')

    return pod
  }

  async update({ request, auth }) {
    const attributes = request.post()
    let pod = await Pod.findOrFail(attributes.id)

    pod.merge(attributes)
    await pod.save()

    return pod
  }

  async destroy({ request, auth }) {
    const { id } = request.params
    const pod = await Pod.findOrFail(id)

    await pod.delete()
  }

}

module.exports = PodController