import IUser from './user.interface'
import { User } from './user.model'

const createUserToDatabase = (data: Partial<IUser>) => {
  return User.create(data)
}

const findUserByPhoneNumber = async (phone: string) => {
  return User.findOne({ phone: phone })
}

const findUserById = async (id: string) => {
  return User.findById(id)
}

export default {
  createUserToDatabase,
  findUserByPhoneNumber,
  findUserById,
}
