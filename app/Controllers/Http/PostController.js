'use strict'

const Route = use('Route')
const Post = use('App/Models/Post')

class PostController {

  async index({ request, response }) {
    const { name } = request.all()

    const post = await Post.all()

    return response.status('200').json(post)
  }

  async store({ request, response }) {
    const params = request.post()

    const post = await Post.create(params)
    await post.reload()

    return response.status('201').json(post)
  }

  async show({ request }) {
    const { id } = request.params

    return Post.findOrFail(id)
  }

  async update({ request, auth }) {
    const attributes = request.post()
    let post = await Post.findOrFail(attributes.id)

    post.merge(attributes)
    await post.save()

    return post
  }

  async destroy({ request, auth }) {
    const { id } = request.params
    const post = await Post.findOrFail(id)

    await post.delete()
  }

}

module.exports = PostController