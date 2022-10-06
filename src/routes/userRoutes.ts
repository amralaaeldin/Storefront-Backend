import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

import { UserStore, User } from '../models/user'

dotenv.config();


const routes = express.Router()
const store = new UserStore()

routes.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.status(400).json(err)
  }
})
routes.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})
routes.post('/users/signup', async (req: Request, res: Response) => {
  try {
    const user = await store.check(req.body.email)

    if (user) {
      res.status(400).json(`Error: email ${req.body.email} is already exist`)
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

    res.json(token)
  } catch (err) {
    res.status(400).json(err)
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
    res.json(token)
  } catch (err) {
    res.status(400).json(err)
  }
})
routes.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await store.update(req.params.id, {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})
routes.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await store.delete(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})


export default routes;
