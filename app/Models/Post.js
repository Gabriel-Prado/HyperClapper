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

  static get columns() {
    return [
      'id',
      'url',
      'pod_id',
      'user_id'
    ]
  }

}

module.exports = Post