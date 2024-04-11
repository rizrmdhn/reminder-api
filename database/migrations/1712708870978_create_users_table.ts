import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('user_id').primary().notNullable()
      table.string('username').notNullable().unique()
      table.string('fullname').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['user_id'], `${this.tableName}_user_id_index`)
      table.index(['username'], `${this.tableName}_username_index`)
      table.index(['email'], `${this.tableName}_email_index`)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
