import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('todo_id').primary().notNullable()
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('created_by').references('user_id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['todo_id'], `${this.tableName}_todo_id_index`)
      table.index(['title'], `${this.tableName}_title_index`)
      table.index(['created_by'], `${this.tableName}_created_by_index`)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
