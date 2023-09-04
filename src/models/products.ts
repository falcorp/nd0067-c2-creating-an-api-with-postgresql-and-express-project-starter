import Client from '../database'

export type Product = {
     id: number;
     name: string;
     price: number;
     category: string;
}

export class StoreProduct {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM product'
      const result = await conn.query(sql)
      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM product WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(p: Product): Promise<Product> {
      try {
    const sql = 'INSERT INTO product (name, price, category) VALUES($1, $2, $3, $4) RETURNING *'
    const conn = await Client.connect()
    const result = await conn.query(sql, [p.name, p.price, p.category])
    const product = result.rows[0]
    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
      }
  }

  async byCategory(category: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM product WHERE category=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [category])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find products in category ${category}. Error: ${err}`)
    }
  }

}