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