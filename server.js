// this file controls the web application server
const express = require('express')
const apiRoutes = require('./routes/api')

// create web application server
const app = express()

app.use(express.json())

//express sees that this is a request for /api so it passes along to api module in /routes
app.use('/api', apiRoutes)


app.use(function(err, req, res, next) {
    // todo - can't find missing route
    res.status(404).send('Not Found')
})

// use this to deal with database errors
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Server Error')
})

const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server started on port ' + server.address().port)
})

