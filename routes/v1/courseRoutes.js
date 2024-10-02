const express = require('express')
const { createCourse } = require('../../controllers/courseController')
const { upload } = require('../../middlewares/multer')
const router = express.Router()


router.get('/allCourses', )

router.get('/Course/:Id', )

router.post('/Create', upload.single('image'), createCourse)

router.patch('/editCourse', )

router.delete('/deleteCourse', )


module.exports = { courseRoutes: router }