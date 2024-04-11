/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import User from '#models/user'
import Todo from '#models/todo'
import Reminder from '#models/reminder'

/**
 * Delete the following ability to start from
 * scratch
 */
export const getTodoAbility = Bouncer.ability((user: User, todo: Todo) => {
  return user.user_id === todo.created_by
})

export const updateTodoAbility = Bouncer.ability((user: User, todo: Todo) => {
  return user.user_id === todo.created_by
})

export const getReminderAbility = Bouncer.ability((user: User, reminder: Reminder) => {
  return user.user_id === reminder.created_by
})

export const updateReminderAbility = Bouncer.ability((user: User, reminder: Reminder) => {
  return user.user_id === reminder.created_by
})
