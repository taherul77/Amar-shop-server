import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import menuRoute from './app/modules/menu/menu.route'
import userRoute from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Route 
app.use('/api/v1/menu', menuRoute)
app.use('/api/v1/user', userRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
