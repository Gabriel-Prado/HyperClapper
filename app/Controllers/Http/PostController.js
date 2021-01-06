'use strict'

const Route = use('Route')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')

class PostController {

  async index({ request, response }) {
    const { name } = request.all()

    const post = await Post.all()

    return response.status('200').json(post)
  }

  async store({ request, response }) {
    const params = request.post()
    const comments = params.comments
    delete params.comments

    const post = await Post.create(params)
    await post.reload()

    comments.forEach((item, i) => {
      comments[i].post_id = post.id
    })

    await Comment.createMany(comments)

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