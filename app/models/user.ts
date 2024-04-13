import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Todo from './todo.js'
import Reminder from './reminder.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare user_id: string

  @column()
  declare username: string

  @column()
  declare fullname: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare avatar: string | null

  @column()
  declare avatar_url: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Todo, {
    localKey: 'user_id',
    foreignKey: 'created_by',
  })
  declare todos: HasMany<typeof Todo>

  @hasMany(() => Reminder, {
    localKey: 'user_id',
    foreignKey: 'created_by',
  })
  declare reminders: HasMany<typeof Reminder>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
