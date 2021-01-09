'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEngageToPostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.integer('engage').notNullable().unsigned()
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('engage')
    })
  }
}

module.exports = AddEngageToPostSchema