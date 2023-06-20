import { Request, Response } from 'express'
import userService from './user.service'
import bcrypt from 'bcrypt'
import config from '../../../config'
import jwt, { JwtPayload } from 'jsonwebtoken'

const createUserHandler = async (req: Request, res: Response) => {
  const { name, phone, password } = req.body
  
  try {
    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    if (password.length <= 7) {
      return res.status(400).json({
        success: false,
        message: 'Password is too short (min 8 chars)',
      })
    }

    const existingUser = await userService.findUserByPhoneNumber(phone)

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Account already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
      name,
      phone,
      password: hashedPassword,
    }

    await userService.createUserToDatabase(user)

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const loginUserHandler = async (req: Request, res: Response) => {
  const { phone, password } = req.body

  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is missing or undefined',
    })
  }

  try {
    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const user = await userService.findUserByPhoneNumber(phone)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      })
    }

    const token = jwt.sign({ phone: user?.phone }, JWT_SECRET, {
      expiresIn: '5h',
    })

    const data = {
      _id: user?._id,
      phone: user?.phone,
      name: user?.name,
      photo: user?.photo,
      role: user?.role
    }

    return res.status(201).json({
      success: true,
      message: 'Login successful',
      token: token,
      user: data,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

const getUserHandler = async (req: Request, res: Response) => {
  const auth_Token = req.header('Authorization')

  if (!auth_Token) {
    return res.status(401).json({
      success: false,
      message: 'Authorization token is missing',
    })
  }

  const token = auth_Token.split(' ')[1]
  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'JWT secret is missing or undefined',
    })
  }

  let phone: string | JwtPayload

  try {
    phone = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  if (typeof phone === 'string') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }

  const user = await userService.findUserByPhoneNumber(phone.phone)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Success',
    user,
  })
}

export default {
  createUserHandler,
  loginUserHandler,
  getUserHandler
}
