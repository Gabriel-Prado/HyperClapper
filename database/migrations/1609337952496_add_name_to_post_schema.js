'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNameToPostSchema extends Schema {
  up() {
    this.table('posts', (table) => {
      table.text('name')
    })
  }

  down() {
    this.table('posts', (table) => {
      table.dropColumn('name')
    })
  }
}

module.exports = AddNameToPostSchema