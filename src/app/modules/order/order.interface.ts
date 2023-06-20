import { Types } from 'mongoose'

type IOrder = {
  data: {
    _id: Types.ObjectId
    name?: string
    recipe: string
    image?: string
    category?: string
    price: number
    quantity: number
  }
  name: string
  phone: string
  address: string
  paymentStatus: boolean
  tranId: string
}

export default IOrder
