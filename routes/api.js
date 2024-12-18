const express = require('express')
const database = require('../models/index.js') // will require the index.js file from this directory
const Student = database.Student // the student model, a sequelize function we can call
// talking to database is not instantaneous. it can take a few seconds to several minutes
// connect to student database above

const router = express.Router()

// create a route to get all students
router.get('/students', function (req, res, next) {
    // query database, get all rows from DB,
    // convert to JSON form
    // available in the then function
    Student.findAll( { order: ['name'] } ).then(students => {
        // sort names into array using order: 'name' above
        return res.json(students)
    })
})

// create a route to add students to the database using .post
router.post('/students', function (req, res, next) {
    const newStudent = req.body
    // req is a request
    // console.log(newStudent) will display new students in the console log
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!')
    }).catch( err => {
        // 400 = bad request - client is sending a request our server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        } else {
            // some other error
            //
            next(err)
        }
    })
})

// write a route handler for patch requests
// colon : is a placeholder for the value
// req.params stores the request...
// ...stores any placeholders in url
router.patch('/students/:id', function (req, res, next) {
    const studentID = req.params.id
    const updatedStudent = req.body   // updated data about this student
    // Student.update will find the row in the database that matches that student ID
    // then will set that data to whatever is in the updated student row
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } } ).then( (result) => {
        // when .then function is called, sequelize returns a result object...
        // that has information about how many rows were updated, etc
        // student id that doesnt exist in our database error handling
        const rowsModified = result[0]
        // if 1 row was changed, we found the student and they were updated
        if (rowsModified === 1) {
            return res.send('OK')
        }
        // student id that doesn't exist
        else {
            // if 0 rows were updated, student was not found
            return res.status(404).send('Student not found')
        }

    }).catch( err => {      // database errors like can't connect, database reports error, etc
        // invalid data in the updatedStudent like no name
        next(err)
    })

    // what kinds of errors can happen when we use this route handler?
    // ...
    // database problems - app can't connect to database
})

module.exports = router
// don't forget the s in exports
