const express = require('express')
const cors = require("cors")
const app = express()
const route = require('./routing')
app.use(express.json())
app.use(cors())

// routes
app.use('/',route)


app.listen(4500,()=>{
    console.log('server is running: http://localhost:4500/')
})