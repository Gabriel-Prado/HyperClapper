'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  comments() {
    this.hasMany('App/Models/Comment')
  }

  static get columns() {
    return [
      'id',
      'url',
      'pod_id'
    ]
  }

}

module.exports = Post