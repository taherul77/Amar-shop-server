import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import userService from '../modules/user/user.service'

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  const { JWT_SECRET } = config

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT secret is missing or undefined' })
  }

  let decodedToken: JwtPayload
  let user
  try {
    decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload
    user = await userService.findUserByPhoneNumber(decodedToken.phone)
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  if (!decodedToken.phone) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Check if the user role is admin
  if (user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }

  next()
}

export default verifyAdmin
