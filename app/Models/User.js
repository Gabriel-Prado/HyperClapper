'use strict'

const Model = use('Model')
const Hash = use('Hash')

const moment = require('moment')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        if (typeof userInstance.password !== 'string') {
          userInstance.password = userInstance.password.toString()
        }
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get hidden() {
    return ['password']
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  createdPods() {
    this.hasMany('App/Models/Pod')
  }

  posts() {
    this.hasMany('App/Models/Post')
  }

  pods() {
    return this
      .belongsToMany('App/Models/Pod')
      .pivotModel('App/Models/UserPod')
      .withPivot(['id', 'user_id', 'pod_id', 'auto_comment', 'auto_like', 'updated_at', 'created_at'])
  }

  comments() {
    this.hasMany('App/Models/Comment')
  }

  static get columns() {
    return [
      'id',
      'username',
      'email',
      'password',
      'photo'
    ]
  }

}

module.exports = User