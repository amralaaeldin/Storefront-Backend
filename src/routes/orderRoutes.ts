import express, { Request, Response } from 'express';
import authorize from '../middleware/authorize';
import { OrderStore, OrderProductReq } from '../models/order';

const routes = express.Router();
const store = new OrderStore();

routes.get('/orders', authorize, async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    return res.json(orders);
  } catch (err) {
    return res.status(400).json(err);
  }
});

routes.get('/orders/:id', authorize, async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    return res.json(order);
  } catch (err) {
    return res.status(400).json(err);
  }
});

routes.post('/orders/', authorize, async (req: Request, res: Response) => {
  try {
    const order = await store.create({
      userId: req.body.userId,
      status: req.body.status,
    });
    // add products in orders_products table
    req.body.products.forEach(async (p: OrderProductReq) => {
      await store.assignProductToOrder(order.id, p);
    });
    return res.json(order);
  } catch (err) {
    return res.status(400).json(err);
  }
});

routes.put('/orders/:id', authorize, async (req: Request, res: Response) => {
  try {
    const order = await store.update(parseInt(req.params.id), {
      userId: req.body.userId,
      status: req.body.status,
    });
    return res.json(order);
  } catch (err) {
    return res.status(400).json(err);
  }
});

routes.delete('/orders/:id', authorize, async (req: Request, res: Response) => {
  try {
    const order = await store.delete(parseInt(req.params.id));
    return res.json(order);
  } catch (err) {
    return res.status(400).json(err);
  }
});

routes.get(
  '/users/:id/orders',
  authorize,
  async (req: Request, res: Response) => {
    try {
      const orders = await store.getProductsInOrdersOfUser(
        parseInt(req.params.id)
      );
      return res.json(orders);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

export default routes;
