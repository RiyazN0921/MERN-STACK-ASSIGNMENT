const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn })
}

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret)
}

const generateAuthToken = async (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  }

  const token = generateToken(payload, secretKey, '1h')

  return token
}

module.exports = { generateToken, verifyToken, generateAuthToken }
