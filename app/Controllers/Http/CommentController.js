'use strict'

const Route = use('Route')
const Comment = use('App/Models/Comment')

class CommentController {

  async index({ request, response }) {
    const { name } = request.all()

    const comment = await Comment.all()

    return response.status('200').json(comment)
  }

  async store({ request, response }) {
    const params = request.post()

    const comment = await Comment.create(params)
    await comment.reload()

    return response.status('201').json(comment)
  }

  async show({ request }) {
    const { id } = request.params

    return Comment.findOrFail(id)
  }

  async update({ request, auth }) {
    const attributes = request.post()
    let comment = await Comment.findOrFail(attributes.id)

    comment.merge(attributes)
    await comment.save()

    return comment
  }

  async destroy({ request, auth }) {
    const { id } = request.params
    const comment = await Comment.findOrFail(id)

    await comment.delete()
  }

}

module.exports = CommentController