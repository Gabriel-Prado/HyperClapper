'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PodSchema extends Schema {
  up() {
    this.create('pods', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.text('description')
      table.integer('created_by').notNullable().unsigned()
      table.foreign('created_by').references('users.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('pods')
  }
}

module.exports = PodSchema