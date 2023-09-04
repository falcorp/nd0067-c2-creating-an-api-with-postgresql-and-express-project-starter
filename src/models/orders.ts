import Client from '../database'

export type Order = {
     id: number;
     product_id: number;
     quantity: number;
     user_id: number;
     status: string;
}

export class UserOrder {
   async getActive(user_id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM order WHERE user_id=($1) AND status=active'
    const conn = await Client.connect()
    const result = await conn.query(sql, [user_id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find active order for user ${user_id}. Error: ${err}`)
    }
  }

  async getCompleted(user_id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM order WHERE user_id=($1) AND status=complete'
    const conn = await Client.connect()
    const result = await conn.query(sql, [user_id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find completed order for user ${user_id}. Error: ${err}`)
    }
  }

  async create(o: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO order (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *'
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [o.product_id, o.quantity, o.user_id, o.status])
    const order = result.rows[0]

    conn.release()

    return order
      } catch (err) {
          throw new Error(`Could not add new order. Error: ${err}`)
      }
  }
}