const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const routes = require('./routes/route')

const PORT = 3000
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use('/', routes)


app.listen(PORT, () => {
  console.log('listening at port: ', PORT)
})