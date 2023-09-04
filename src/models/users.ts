import Client from '../database';
import bcrypt from "bcrypt";

export type User = {
     id: number;
     firstName: string;
     lastName: string;
     password: string;
}

export class StoreUser {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM user'
      const result = await conn.query(sql)
      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
    const sql = 'SELECT * FROM user WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
      try {
    const sql = 'INSERT INTO user (firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *'
    const conn = await Client.connect();
    const hash = bcrypt.hashSync( u.password ,12);
    const result = await conn.query(sql, [u.firstName, u.lastName, hash])
    const user = result.rows[0]
    conn.release()
    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`)
      }
  }
}