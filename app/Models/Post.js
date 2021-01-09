'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  comments() {
    this.hasMany('App/Models/Comment')
  }

  user() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  pod() {
    return this.belongsTo('App/Models/Pod')
  }

  static get columns() {
    return [
      'id',
      'url',
      'pod_id',
      'user_id',
      'engage'
    ]
  }

}

module.exports = Post