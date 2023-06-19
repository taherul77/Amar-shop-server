import express from 'express'
import userController from './user.controller'
const router = express.Router()

router.post('/create-user', userController.createUserHandler)
router.post('/login', userController.loginUserHandler)
router.get('/current-user', userController.getUserHandler)

export default router
