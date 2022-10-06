import Client from './../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = "secret-pepper"

export type LoginUser = {
  email: string;
  password: string;
};

export type ReqUser = {
  fname: string;
  lname: string;
  email: string;
};

export type User = ReqUser & {
  id: number;
  password: string;
};


export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Can't get users : ${err}`);
    }
  }

  async authenticate(u: LoginUser): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await conn.query(sql, [u.email]);
      conn.release();

      if (result.rows[0] && bcrypt.compareSync(u.password + pepper, result.rows[0].password)) {
        return result.rows[0];
      } else {
        return null;
      }

    } catch (err) {
      throw new Error(`Could not find User ${u.email}. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }

  async check(email: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows[0] || null;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }


  async create(u: ReqUser & { password: string }): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (fname, lname, email, password) VALUES($1, $2, $3, $4) RETURNING *';
      const hashedPassword = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))

      const result = await conn.query(sql, [
        u.fname,
        u.lname,
        u.email,
        hashedPassword
      ]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new User ${u.email}. Error: ${err}`);
    }
  }

  async update(id: number, u: ReqUser & { password: string }): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE users SET fname= $2, lname= $3, email= $4, password= $5 WHERE id=($1) RETURNING *';
      const hashedPassword = bcrypt.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS as string))
      const result = await conn.query(sql, [
        id,
        u.fname,
        u.lname,
        u.email,
        hashedPassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Can't update user ${id} : ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
