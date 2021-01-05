'use strict'

const Post = use('App/Models/Post')

class UserPostController {

  async index({ request, response }) {
    const { search } = request.all()
    const { user_id } = request.params

    const posts = !!search ?
      await Post.query().where('user_id', user_id).where('name', 'like', `%${search}%`).fetch() :
      await Post.query().where('user_id', user_id).fetch()

    return response.status('200').json(posts)
  }

}

module.exports = UserPostController