import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'username.required': 'Username is required',
  'username.unique': 'Username already exists',
  'username.minLength': 'Username must be at least 3 characters',
  'username.maxLength': 'Username must not exceed 255 characters',
  'fullname.required': 'Fullname is required',
  'fullname.maxLength': 'Fullname must not exceed 255 characters',
  'email.required': 'Email is required',
  'email.unique': 'Email already exists',
  'email.email': 'Email is invalid',
  'email.maxLength': 'Email must not exceed 255 characters',
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 255 characters',
  'title.required': 'Title is required',
  'title.minLength': 'Title must be at least 3 characters',
  'title.maxLength': 'Title must not exceed 255 characters',
  'description.maxLength': 'Description must not exceed 2555 characters',
  'timeReminder.required': 'Time reminder is required',
  'timeReminder.minLength': 'Time reminder must be at least 3 characters',
  'timeReminder.maxLength': 'Time reminder must not exceed 255 characters',
})
