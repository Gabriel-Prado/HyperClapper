'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserPod extends Model {

  task() {
    return this.belongsTo('App/Models/User', 'user_id')
  }

  question() {
    return this.belongsTo('App/Models/Pod', 'pod_id')
  }

  static get columns() {
    return [
      'id',
      'user_id',
      'pod_id',
      'auto_comment',
      'auto_like'
    ]
  }

}

module.exports = UserPod