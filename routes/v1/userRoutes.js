const express = require('express')
const { userSignup, userLogedin, userLogout, getUserById, checkUser, } = require('../../controllers/userController')
const { userAuth } = require('../../middlewares/userAuth')
const router = express.Router()


// define the home page route
router.get('/allUsers',)
router.get('/profile', userAuth, getUserById)

router.post('/signup', userSignup)
router.post('/login', userLogedin)
router.post('/logout', userLogout)

router.patch('/upate-User',)
router.delete('/delete-User',)


router.get('/check-User',userAuth, checkUser)


module.exports = { userRoutes: router }