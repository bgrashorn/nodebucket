/**
 * Title: mongo.js
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/17/2023
 */

'use strict'

const { MongoClient } = require('mongodb');
// const config = require('./config');

// Connects to the database
const MONGO_URL = 'mongodb+srv://nodebucket_user:s3cret@bellevueuniversity.3x5untt.mongodb.net/nodebucket?retryWrites=true&w=majority'
// config.DB_URL if using Config example

const mongo = async(operations, next) => {
  try {
    console.log('Connecting to MongoDB Atlas...', MONGO_URL)

    // Connect to MongoDB cluster
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      UseUnifiedTopology: true
    })

    // Select the database
    const db = client.db('nodebucket') // config.DB_NAME if using config
    console.log('Connected to MongoDB Atlas')

    // Execute the operations
    await operations(db)
    console.log('Operation was successful')

    // Close the connection
    client.close()
    console.log('Closing connection to MongoDB Atlas')

  } catch (err) {
    const error = new Error('Error connecting to db', err)
    error.status = 500
    console.log('Error connecting to db', err)
    next(error)
  } // catches error if can't connect to db
}

module.exports = { mongo }