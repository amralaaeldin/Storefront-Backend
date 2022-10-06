import express, { Request, Response } from 'express'
import { OrderStore, OrderProductReq } from '../models/order'

const routes = express.Router()
const store = new OrderStore()

routes.get('/orders', async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id)
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.post('/orders/', async (req: Request, res: Response) => {
  try {
    const order = await store.create({
      userId: req.body.userId,
      status: req.body.status,
    })
    // add products in orders_products table
    req.body.products.forEach(async (p: OrderProductReq) => {
      await store.assignProductsToOrder(order.id, p.productId, p.quantity)
    });
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.put('/orders/:id', async (req: Request, res: Response) => {
  try {
    const order = await store.update(req.params.id, {
      userId: req.body.userId,
      status: req.body.status,
    })
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})

routes.delete('/orders/:id', async (req: Request, res: Response) => {
  try {
    const order = await store.delete(req.params.id)
    res.json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})


export default routes;
