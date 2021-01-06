'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAutoToPodSchema extends Schema {
  up() {
    this.table('pods', (table) => {
      table.boolean('auto_comment')
      table.boolean('auto_like')
    })
  }

  down() {
    this.table('pods', (table) => {
      table.dropColumn('auto_comment')
      table.dropColumn('auto_like')
    })
  }
}

module.exports = AddAutoToPodSchema