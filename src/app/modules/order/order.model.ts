import { Schema, model } from 'mongoose'
import IOrder from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    data: {
      _id: { type: Schema.Types.ObjectId, ref: 'Menu' },
      name: { type: String },
      recipe: { type: String },
      image: { type: String },
      category: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentStatus: { type: Boolean, required: true },
    tranId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const Order = model<IOrder>('Order', orderSchema)
