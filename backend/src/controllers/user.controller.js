const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { CustomError } = require('../middlewares/errorHandler.middleware')
const { generateAuthToken } = require('../middlewares/jwt.middleware')
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new CustomError('Email already exists!', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res
      .status(200)
      .json({ message: 'Signup successful', sucess: true, data: newUser })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      throw new CustomError('Invalid Credentials!', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new CustomError('Invalid Password!', 401)
    }

    const token = await generateAuthToken(
      { userId: user._id, email: user.email },
      secretKey,
      '1h',
    )

    res
      .status(200)
      .json({ token, message: 'Login successful', sucess: true, data: user })
  } catch (error) {
    next(error)
  }
}
