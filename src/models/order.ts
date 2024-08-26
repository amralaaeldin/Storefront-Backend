import Client from './../database';

export type ReqOrder = {
  userId: number;
  status: boolean;
};

export type Order = {
  id: number;
  user_id: string;
  status: boolean;
};

export type ProductOfOrder = {
  order_id: number;
  name: string;
  price: string;
  quantity: number;
  status: boolean;
};

export type OrderProductReq = {
  product_id: number;
  quantity: number;
};

export type OrderProduct = {
  id: number;
  order_id: string;
  product_id: string;
  quantity: number;
};

export type ProductInOrderOfUser = ProductOfOrder & {
  fname: string;
  lname: string;
  email: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Can't get orders : ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: ReqOrder): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.userId, o.status]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async update(id: number, o: ReqOrder): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE orders SET user_id= $2, status= $3 WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id, o.userId, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async getProductsInOrdersOfUser(
    userId: number
  ): Promise<ProductInOrderOfUser[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT orders.id as order_id, products.name, price, quantity, status, fname, lname, email, users.id as user_id FROM orders INNER JOIN orders_products ON orders.id=orders_products.order_id INNER JOIN products ON orders_products.product_id=products.id INNER JOIN users ON orders.user_id=users.id WHERE users.id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products in orders of user ${userId}. Error: ${err}`
      );
    }
  }

  async getProductsInOrder(orderId: number): Promise<ProductOfOrder[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT orders.id as order_id, name, price, quantity, status FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id INNER JOIN products ON orders_products.product_id=products.id WHERE orders.id=($1)';
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products of order ${orderId}. Error: ${err}`
      );
    }
  }

  async getProductsInAnOrderOfUser(
    orderId: number,
    userId: number
  ): Promise<ProductInOrderOfUser[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT orders.id as order_id, name, price, quantity, status, fname, lname, email, users.id as user_id FROM orders INNER JOIN orders_products ON orders_products.order_id=orders.id INNER JOIN products ON orders_products.product_id=products.id INNER JOIN users ON orders.user_id=users.id WHERE orders.id=($1) AND users.id=($2)';
      const result = await conn.query(sql, [orderId, userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products in order ${orderId} of user ${userId}. Error: ${err}`
      );
    }
  }

  async assignProductToOrder(
    orderId: number,
    p: OrderProductReq
  ): Promise<OrderProduct> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [orderId, p.product_id, p.quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not insert product ${p.product_id} in order ${orderId}. Error: ${err}`
      );
    }
  }
}
