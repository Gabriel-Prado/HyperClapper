'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

  static get columns() {
    return [
      'id',
      'post_id',
      'user_id',
      'value'
    ]
  }

}

module.exports = Comment