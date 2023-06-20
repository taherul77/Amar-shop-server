import express from 'express'
import orderController from './order.controller'
const router = express.Router()

router.post('/create', orderController.createOrder)

export default router