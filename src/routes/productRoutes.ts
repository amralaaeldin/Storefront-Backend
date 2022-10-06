import express, { Request, Response } from 'express'
import { ProductStore } from '../models/product'

const routes = express.Router()
const store = new ProductStore()

routes.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.post('/products/', async (req: Request, res: Response) => {
  try {
    const product = await store.create({
      name: req.body.name,
      price: req.body.price,
    })
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.update(req.params.id, {
      name: req.body.name,
      price: req.body.price,
    })
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.delete(req.params.id)
    res.json(product)
  } catch (err) {
    res.status(400).json(err)
  }
})


export default routes;
