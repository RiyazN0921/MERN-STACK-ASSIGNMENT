const express = require('express')

const bodyparser = require('body-parser')

const { dbConnection } = require('./src/config/db.config')

const cors = require('cors')
const { errorHandler } = require('./src/middlewares/errorHandler.middleware')

const app = express()

app.use(cors())

app.use(bodyparser.json())

require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res, next) => {
  try {
    res.status(200).json({
      message: 'Hello, Welcome to K-RITE!',
    })
  } catch (error) {
    next(error)
  }
})

app.use('/api/user', require('./src/routes/user.routes'))

app.use('/api/task', require('./src/routes/tasks.routes'))

app.use(errorHandler)

app.listen(port, async () => {
  console.log('server listening on port ' + port)
  await dbConnection()
})
