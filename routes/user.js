const Express = require('express')

const Router = Express.Router()

const userController = require('../controllers/user')

Router.post('/signup',userController.signup)

Router.post('/login',userController.login)

Router.post('/message',userController.chat)

Router.get('/message',userController.getChats)

module.exports = Router