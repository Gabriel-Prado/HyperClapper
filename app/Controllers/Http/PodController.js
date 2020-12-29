'use strict'

const Route = use('Route')
const Pod = use('App/Models/Pod')

class PodController {

  async index({ request, response }) {
    const { name } = request.all()

    const pod = await Pod.all()

    return response.status('200').json(pod)
  }

  async store({ request, response }) {
    const params = request.post()

    const pod = await Pod.create(params)
    await pod.reload()

    return response.status('201').json(pod)
  }

  async show({ request }) {
    const { id } = request.params

    return Pod.findOrFail(id)
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