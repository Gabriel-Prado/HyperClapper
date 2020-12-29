'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pod extends Model {

  owner() {
    return this.belongsTo('App/Models/User', 'created_by')
  }

  users() {
    return this
      .belongsToMany('App/Models/User')
      .pivotModel('App/Models/UserPod')
      .withPivot(['id', 'user_id', 'pod_id', 'auto_comment', 'auto_like', 'updated_at', 'created_at'])
  }

  static get columns() {
    return [
      'id',
      'name',
      'description',
      'created_by'
    ]
  }

}

module.exports = Pod