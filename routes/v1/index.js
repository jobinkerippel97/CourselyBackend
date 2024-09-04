const express = require('express')
const { userRoutes } = require('./userRoutes')
const {courseRoutes} = require('./courseRoutes')
const {mentorRoutes} = require('./mentorRoutes')

const v1Routes = express.Router()

v1Routes.use('/users', userRoutes )
v1Routes.use('/courses', courseRoutes)
v1Routes.use('/mentors',mentorRoutes)

module.exports = { v1Routes }