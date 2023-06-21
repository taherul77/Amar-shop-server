import IOrder from './order.interface'
import { Order } from './order.model'

const createOrderForDatabase = async (payload: IOrder) => {
  const result = await Order.insertMany(payload)
  return result
}

const updateOrderFromDatabase = async (tranId: any) => {
  const result = await Order.updateMany(
    { tranId: tranId },
    {
      $set: {
        paymentStatus: true,
      },
    }
  )
  return result
}

const deleteOrderFromDatabase = async (tranId: any) => {
  const result = await Order.deleteMany({ tranId: tranId })
  return result
}

const getSingleOrderFromDatabase = async (phone: string) => {
  const result = await Order.find({phone: phone})
  return result
}

const total = async () => {
  const result = await Order.countDocuments()
  return result
}

const all = async () => {
  const result = await Order.find({})
  return result
}

export default {
  createOrderForDatabase,
  updateOrderFromDatabase,
  deleteOrderFromDatabase,
  getSingleOrderFromDatabase,
  total,
  all,
}
