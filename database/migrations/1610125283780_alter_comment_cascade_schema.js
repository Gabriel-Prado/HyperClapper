'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterCommentCascadeSchema extends Schema {
  up() {
    this.alter('comments', (table) => {
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

      table.dropForeign('post_id')
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .alter()
    })
  }

  down() {
    this.alter('comments', (table) => {
      table.dropForeign('user_id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .alter()

      table.dropForeign('post_id')
      table
        .integer('post_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('posts')
        .alter()
    })
  }
}

module.exports = AlterCommentCascadeSchema