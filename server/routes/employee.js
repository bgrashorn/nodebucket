/**
 * Title: employee.js
 * Author: Professor Krasso and Brett Grashorn
 * Date: 8/17/2023
 */

'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utils/mongo')

/** findEmployeeById
 *  Description: Accept values 1007-1012
 *  localhost:3000/api/employees/1007 - 200: Success
 *  localhost:3000/api/employees/asdf - 400: Bad Request
 *  localhost:3000/api/employees/1016 - 404: Not Found
 *  localhost:3000/api/employees/1008 - 500: Server Error (db not connected)
 */
router.get('/:empId', (req, res, next) => {
  try {
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

module.exports = router