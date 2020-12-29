'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPodsSchema extends Schema {
  up() {
    this.create('user_pods', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('pod_id').notNullable().unsigned()
      table.foreign('pod_id').references('pods.id')
      table.boolean('auto_comment')
      table.boolean('auto_like')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_pods')
  }
}

module.exports = UserPodsSchema