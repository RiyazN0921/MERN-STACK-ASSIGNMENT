const mongoose = require('mongoose')
const { validatePassword, validateEmail } = require('../utils/validation.utils')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validatePassword,
      message: 'Password should be at least 6 characters long',
    },
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
