import Client from './../database';

export type ReqOrder = {
  name: string;
  productId: string;
  quantity: number;
  userId: string;
  status: boolean;
};

export type Order = {
  id: string;
} & ReqOrder;

export type ProductOfOrder = {
  orderId: string;
  name: string;
  price: number;
  quantity: number;
  status: boolean;
}

export type ProductInOrderOfUser = ProductOfOrder & {
  fname: string;
  lname: string;
  email: string;
  userId: string;
}



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

  async show(id: string): Promise<Order> {
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
        'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        o.productId,
        o.quantity,
        o.userId,
        o.status,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order ${o.productId} with quantity ${o.quantity}. Error: ${err}`);
    }
  }

  async update(id: string, o: ReqOrder): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE orders SET product_id= $2, quantity= $3, user_id= $4, status= $5 WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [
        id,
        o.productId,
        o.quantity,
        o.userId,
        o.status,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update ${o.productId} with quantity ${o.quantity}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
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

  async getProductsInOrdersOfUser(userId: string): Promise<ProductInOrderOfUser[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT orders.id as orderId, name, price, quantity, status, fname, lname, email, users.id as userId FROM orders INNER JOIN products ON orders.product_id=products.id INNER JOIN users ON orders.user_id=users.id WHERE users.id=($1)';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products in orders of user ${userId}. Error: ${err}`);
    }
  }

  async getProductsInOrder(orderId: string): Promise<ProductOfOrder> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT orders.id as orderId, name, price, quantity, status FROM orders INNER JOIN products ON orders.product_id=products.id WHERE orders.id=($1)';
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get products of order ${orderId}. Error: ${err}`);
    }
  }

  async getProductInOrderOfUser(orderId: string, userId: string): Promise<ProductInOrderOfUser> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT orders.id as orderId, name, price, quantity, status, fname, lname, email, users.id as userId FROM orders INNER JOIN products ON orders.product_id=products.id INNER JOIN users ON orders.user_id=users.id WHERE orders.id=($1) AND users.id=($2)';
      const result = await conn.query(sql, [orderId, userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get products in order ${orderId} of user ${userId}. Error: ${err}`);
    }
  }

}
