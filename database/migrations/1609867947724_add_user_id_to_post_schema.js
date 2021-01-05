'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdToPostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.integer('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('user_id')
      table.dropForeign('user_id')
    })
  }
}

module.exports = AddUserIdToPostSchema