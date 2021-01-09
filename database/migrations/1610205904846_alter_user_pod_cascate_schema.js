'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterUserPodCascateSchema extends Schema {
  up() {
    this.alter('user_pods', (table) => {
      table.dropForeign('user_id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .alter()

      table.dropForeign('pod_id')
      table
        .integer('pod_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pods')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .alter()
    })
  }

  down() {
    this.alter('user_pods', (table) => {
      table.dropForeign('user_id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .alter()

      table.dropForeign('pod_id')
      table
        .integer('pod_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pods')
        .alter()
    })
  }
}

module.exports = AlterUserPodCascateSchema