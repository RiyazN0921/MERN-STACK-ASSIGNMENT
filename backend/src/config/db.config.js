const mongoose = require('mongoose')

require('dotenv').config()
const db_url = process.env.MONGO_URL

exports.dbConnection = async () => {
  try {
    await mongoose.connect(db_url)
    console.log('Database connection established!')
  } catch (error) {
    console.log(error)
  }
}
