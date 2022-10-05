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
}
