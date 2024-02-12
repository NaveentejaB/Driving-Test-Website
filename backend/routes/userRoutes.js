const express = require('express')
const user = require('../controllers/user')
const auth = require('../controllers/auth')
const {authenticate} = require('../middleware/authenticate')


const userRouter = express.Router()

userRouter.post('/signup',auth.register)

userRouter.post('/login',auth.login)

userRouter.get('/details',authenticate,user.getUserInfo)

userRouter.post('/details',authenticate,user.updateDetails)

userRouter.post('/update_result',authenticate,user.updateResult)

userRouter.get('/check',authenticate,user.check)

module.exports = userRouter