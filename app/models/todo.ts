import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  declare todo_id: string

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare created_by: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'created_by',
    foreignKey: 'user_id',
  })
  declare user: HasOne<typeof User>
}
