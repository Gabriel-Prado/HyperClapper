'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentSchema extends Schema {
  up() {
    this.create('comments', (table) => {
      table.increments()
      table.integer('post_id').notNullable().unsigned()
      table.foreign('post_id').references('posts.id')
      table.integer('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
      table.text('value').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('comments')
  }
}

module.exports = CommentSchema