/**
 * Title: employee.js
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/23/2023
 */

'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utils/mongo')
const Ajv = require('ajv')
const { ObjectId } = require('mongodb')

const ajv = new Ajv() // creates a new instance of the Ajv class

// category schema
const categorySchema = {
  type: 'object',
properties: {
  categoryName: { type: 'string'},
  backgroundColor: { type: 'string' }
},
required: ['categoryName', 'backgroundColor'],
additionalProperties: false
}

// define a schema to validate a new task
// TODO - Figure out why this isn't preventing additional properties
// TODO - As of now it is allowing us to send a second property of bar
// Allowing sending of second property
const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string'},
    category: categorySchema
  },
  required: [ 'text', 'category' ],
  additionalProperties: false
}

/** findEmployeeById
 *  Description: Accept values 1007-1012
 *  @example
 *  localhost:3000/api/employees/1007 - 200: Success
 *  localhost:3000/api/employees/asdf - 400: Bad Request
 *  localhost:3000/api/employees/1016 - 404: Not Found
 *  localhost:3000/api/employees/1008 - 500: Server Error (db not connected)
 */
router.get('/:empId', (req, res, next) => {
  try {

    console.log('empId', req.params.empId)

    let { empId } = req.params
    empId = parseInt(empId, 10)

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {
      const employee = await db.collection('employees').findOne({ empId }) // find employee by ID

      if (!employee) {
        const err = new Error('Unable to find employee with empID ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.send(employee)
    }, next)


  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * findAllTasks
 *
 */
router.get('/:empId/tasks', (req, res, next) =>{
  try{
    console.log('findAllTasks API')

    let { empId } = req.params // get the empId
    empId = parseInt (empId, 10) // parse the empId to an int

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {
      const tasks = await db.collection('employees').findOne(
        { empId},
        { projection: { empId: 1, todo: 1, done: 1} }

      )
      if (!tasks) {
        const err = new Error ('Unable to find tasks for empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.send(tasks) // return the tasks array
    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * createNewTask
 */
router.post('/:empId/tasks', (req, res, next) => {
  try {
    console.log('createTask API')

    let { empId } = req.params
    empId = parseInt(empId, 10)

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {

      const employee = await db.collection('employees').findOne({ empId })

      console.log('employee', employee)

      if (!employee) {
        const err = new Error('Unable to find employee with EmpId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      const { task } = req.body


      console.log('New Task: ', task)
      console.log('body', req.body)

      const validator = ajv.compile(taskSchema)
      const valid = validator(task)

      console.log('valid', valid)

      if (!valid) {
        const err = new Error('Bad Request')
        err.status = 400
        err.errors = validators.errors
        console.log('req.body validation failed', err)
        next(err)
        return
      }

      //build the task object to insert into MongoDB atlas
      const newTask = {
        _id: new ObjectId(),
        text: task.text,
        category: task.category
      }

      const result = await db
      .collection('employees')
      .updateOne({ empId }, { $push: { todo: newTask } })

      // const result = await db.collection('employees').updateOne(
      //   { empId },
      //   { $push: { todo: newTask }}

      // )

      console.log('result', result)

      if (!result.modifiedCount) {
        const
        err = new Error('Unable to create tasks for empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.status(201).send({ id: newTask._id })
    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})



module.exports = router