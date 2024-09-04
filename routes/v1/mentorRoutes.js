const express = require('express')
const { mentorSignup, mentorLogedin, mentorLogout, getMentorById, checkMentor } = require('../../controllers/mentorController')
const { mentorAuth } = require('../../middlewares/mentorAuth')
const router = express.Router()


// define the home page route
router.get('/allMentors',)
router.get('/profile', mentorAuth, getMentorById)

router.post('/signup', mentorSignup)
router.post('/login', mentorLogedin)
router.post('/logout', mentorLogout)

router.patch('/upateMentor',)
router.delete('/deleteMentor',)


router.get('/checkMentor', checkMentor)


module.exports = { mentorRoutes: router }