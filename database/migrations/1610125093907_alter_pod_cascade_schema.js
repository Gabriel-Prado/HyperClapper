'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPodCascadeSchema extends Schema {
  up() {
    this.alter('pods', (table) => {
      table.dropForeign('created_by')
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .alter()
    })
  }

  down() {
    this.alter('pods', (table) => {
      table.dropForeign('created_by')
      table
        .integer('created_by')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .alter()
    })
  }
}

module.exports = AlterPodCascadeSchema