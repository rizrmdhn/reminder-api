import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Todo from './todo.js'
import User from './user.js'

export default class Reminder extends BaseModel {
  @column({ isPrimary: true })
  declare reminder_id: string

  @column()
  declare id_todo: string

  @column()
  declare description: string | null

  @column.dateTime()
  declare time_reminder: DateTime

  @column()
  declare created_by: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Todo, {
    localKey: 'id_todo',
    foreignKey: 'todo_id',
  })
  declare todo: HasOne<typeof Todo>

  @hasOne(() => User, {
    localKey: 'created_by',
    foreignKey: 'user_id',
  })
  declare user: HasOne<typeof User>
}
