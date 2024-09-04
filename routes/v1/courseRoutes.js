const express = require('express')
const { createCourse } = require('../../controllers/courseController')
const router = express.Router()


router.get('/allCourses', )

router.get('/Course/:Id', )

router.post('/Create', createCourse)

router.patch('/editCourse', )

router.delete('/deleteCourse', )


module.exports = { courseRoutes: router }