import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reminders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('reminder_id').primary().notNullable()
      table.string('id_todo').references('todo_id').inTable('todos').onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('description').nullable()
      table.string('time_reminder').notNullable()
      table.string('created_by').references('user_id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['reminder_id'], `${this.tableName}_reminder_id_index`)
      table.index(['id_todo'], `${this.tableName}_id_todo_index`)
      table.index(['time_reminder'], `${this.tableName}_time_reminder_index`)
      table.index(['created_by'], `${this.tableName}_created_by_index`)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
