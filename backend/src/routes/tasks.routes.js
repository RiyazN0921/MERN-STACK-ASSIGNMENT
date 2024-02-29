const express = require('express')

const router = express.Router()

const taskController = require('../controllers/task.controller')
const { verifyToken } = require('../middlewares/jwt.middleware')

require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY

const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.header('Authorization')

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' })
  }

  const [tokenType, token] = authorizationHeader.split(' ')

  if (!tokenType || !token) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' })
  }

  try {
    const decoded = verifyToken(token, secretKey)
    req.user = decoded
    next()
  } catch (error) {
    console.error(error.message)
    res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}

router.use(authenticateUser)

router.post('/', taskController.createTask)

router.get('/', taskController.getTasks)

router.put('/:id/complete', taskController.markTaskAsCompleted)

router.put('/:id', taskController.editTask)

router.delete('/:id', taskController.deleteTask)

router.get('/title/:title', taskController.getTaskByTitleName)

router.get('/category/:category', taskController.getByCategory)

module.exports = router
