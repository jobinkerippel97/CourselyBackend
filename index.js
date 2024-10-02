
const express = require('express')

require('dotenv').config()

const { apiRoutes } = require('./routes')
const { connectDB } = require('./config/db.js')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const { handleError } = require('./utils/error')

connectDB();

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors('*'));

const port = 3000



app.use('/api', apiRoutes)
app.use(handleError)
app.all("*",(req, res) => {
  res.status(404).json({message: "end point does not exist"}) 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


