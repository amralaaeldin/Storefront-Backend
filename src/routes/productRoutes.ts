import express, { Request, Response } from 'express'
import authorize from '../middleware/authorize'
import { ProductStore } from '../models/product'

const routes = express.Router()
const store = new ProductStore()

routes.get('/products', async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    return res.json(products)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id))
    return res.json(product)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.post('/products/', authorize, async (req: Request, res: Response) => {
  try {
    const product = await store.create({
      name: req.body.name,
      price: req.body.price,
    })
    return res.json(product)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.put('/products/:id', authorize, async (req: Request, res: Response) => {
  try {
    const product = await store.update(parseInt(req.params.id), {
      name: req.body.name,
      price: req.body.price,
    })
    return res.json(product)
  } catch (err) {
    return res.status(400).json(err)
  }
})

routes.delete('/products/:id', authorize, async (req: Request, res: Response) => {
  try {
    const product = await store.delete(parseInt(req.params.id))
    return res.json(product)
  } catch (err) {
    return res.status(400).json(err)
  }
})


export default routes;
