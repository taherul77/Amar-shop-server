// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts')
import config from '../../../config'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import IOrder from './order.interface'
import orderService from './order.service'

const store_id = config.STORE_ID
const store_passwd = config.STORE_PASS
const is_live = false

export const createOrder = async (req: Request, res: Response) => {
  const { order, price, name, phone, address } = req.body

  const tranId = new mongoose.Types.ObjectId().toString()

  const orderData = order.map((item: Partial<IOrder>) => {
    return {
      ...item,
      name,
      phone,
      address,
      paymentStatus: false,
      tranId,
    }
  })

  const data = {
    total_amount: price,
    currency: 'BDT',
    tran_id: tranId,
    success_url: `http://localhost:5000/payment/success/${tranId}`,
    fail_url: `http://localhost:5000/payment/fail/${tranId}`,
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: name,
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: phone,
    cus_fax: '01711111111',
    ship_name: name,
    ship_add1: address,
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(async (apiResponse: { GatewayPageURL: any }) => {
    const GatewayPageURL = apiResponse.GatewayPageURL
    res.send({ url: GatewayPageURL })
    await orderService.createOrderForDatabase(orderData)
  })
}

export const successPayment = async (req: Request, res: Response) => {
  const { tranId } = req.params

  const result = await orderService.updateOrderFromDatabase(tranId as any)
  if (result.modifiedCount > 0) {
    res.redirect(`http://localhost:5173/payment/success/${tranId}`)
  }
}

export const failPayment = async (req: Request, res: Response) => {
  const { tranId } = req.params

  const result = await orderService.deleteOrderFromDatabase(tranId as any)
  if (result.deletedCount) {
    res.redirect(`http://localhost:5173/payment/fail/${tranId}`)
  }
}

export default {
  createOrder,
  successPayment,
  failPayment,
}
