import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

import { UserStore, User } from '../models/user'
import authorize from '../middleware/authorize';

dotenv.config();


const routes = express.Router()
const store = new UserStore()

routes.get('/users', authorize, async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    return res.json(users)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.get('/users/:id', authorize, async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id))
    return res.json(user)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.post('/users/', async (req: Request, res: Response) => {
  try {
    const user = await store.check(req.body.email)

    if (user) {
      return res.status(400).json(`Error: email ${req.body.email} is already exist`)
    }

    if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
      return res.status(400).json(`Error: fname, lname, email and password are required`)
    }
    await store.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    })

    let token = jwt.sign({
      user: {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
      }
    }, process.env.SECRET_TOKEN as string)

    return res.json(token)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.post('/users/login', async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate({
      email: req.body.email,
      password: req.body.password,
    })

    let token = jwt.sign({
      user: {
        fname: (user as User).fname,
        lname: (user as User).lname,
        email: (user as User).email,
      }
    }, process.env.SECRET_TOKEN as string)
    return res.json(token)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.put('/users/:id', authorize, async (req: Request, res: Response) => {
  try {
    const user = await store.update(parseInt(req.params.id), {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    })
    return res.json(user)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.delete('/users/:id', authorize, async (req: Request, res: Response) => {
  try {
    const user = await store.delete(parseInt(req.params.id))
    return res.json(user)
  } catch (err) {
    return res.status(400).json(err)
  }
})


export default routes;
