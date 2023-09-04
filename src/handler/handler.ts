import jwt from 'jsonwebtoken'
import { Order,UserOrder } from './../models/orders';
import { Product, StoreProduct } from '../models/products';
import { User,StoreUser } from '../models/users';
import express, { Request, Response } from 'express';
import Client from '../database'

const storeUser = new StoreUser();
const storeProduct = new StoreProduct();
const userOrder = new UserOrder();

const indexUser = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }
  const user = await storeUser.index();
  res.json(user);
}

const showUser = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }
   const user = await storeUser.show(req.params.id);
   res.json(user);
}

const createUser = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }

    try {
        const user: User = { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            id: req.body.id,
        }

        const newUser = await storeUser.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const indexProduct = async (_req: Request, res: Response) => {
    const product = await storeProduct.index()
    res.json(product)
  }
  
  const showProduct = async (req: Request, res: Response) => {
     const product = await storeProduct.show(req.params.id)
     res.json(product)
  }
  
  const productByCategory = async (req: Request, res: Response) => {
    const product = await storeProduct.show(req.params.category)
    res.json(product)
 }
  
  const createProduct = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }
      try {
          const product: Product = { 
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            id: req.body.id,
          }
  
          const newProduct = await storeProduct.create(product)
          res.json(newProduct)
      } catch(err) {
          res.status(400)
          res.json(err)
      }
  }

  const getActiveOrder = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }
    const order = await userOrder.getActive(req.params.user_id)
    res.json(order)
 }

 const getCompletedOrder = async (req: Request, res: Response) => {
    try { 
        const authorizationHeader = req.headers.authorization; 
        const token = authorizationHeader? authorizationHeader?.split(' ')[1] : ' ' ;
        jwt.verify(token, "secretKey"); 
    } catch(err) { 
        res.status(401);
        res.json('Access denied, invalid token') 
        return 
    }
    const order = await userOrder.getCompleted(req.params.user_id)
    res.json(order)
 }

 const createOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = { 
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            status: req.body.status,
            user_id: req.body.user_id,
            id: req.body.id,
        }

        const newOrder = await userOrder.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

export const userRoutes = (app: express.Application) => {
  app.get('/user', indexUser)
  app.get('/user/:id', showUser)
  app.post('/user', createUser)
}

export const orderRoutes = (app: express.Application) => {
    app.get('/order/:user_id', getActiveOrder)
    app.get('/order/:user_id', getCompletedOrder)
    app.post('/order', createOrder)
}

export const productRoutes = (app: express.Application) => {
    app.get('/product', indexProduct)
    app.get('/product/:id', showProduct)
    app.post('/product', createProduct)
    app.get('/product/:category', productByCategory)
}

