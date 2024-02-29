const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { CustomError } = require('../middlewares/errorHandler.middleware')
const { generateAuthToken } = require('../middlewares/jwt.middleware')
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      throw new CustomError('Username already exists!', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res
      .status(200)
      .json({ message: 'Signup successful', success: true, data: newUser })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      throw new CustomError('Invalid Credentials!', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new CustomError('Invalid Password!', 401)
    }

    const token = await generateAuthToken(
      { userId: user._id, username: user.username },
      secretKey,
      '1h',
    )

    res
      .status(200)
      .json({ token, message: 'Login successful', success: true, data: user })
  } catch (error) {
    next(error)
  }
}
