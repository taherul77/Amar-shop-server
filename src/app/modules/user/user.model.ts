import { Schema, model } from 'mongoose'
import IUser from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: {
      type: String,
      default: 'https://i.ibb.co/JHhYHC6/user.png',
    },
    role: { type: String, default: 'user', required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', userSchema)
