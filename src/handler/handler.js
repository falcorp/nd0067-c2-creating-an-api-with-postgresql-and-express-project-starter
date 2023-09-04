"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const storeUser = new users_1.StoreUser();
const storeProduct = new products_1.StoreProduct();
const userOrder = new orders_1.UserOrder();
const indexUser = async (_req, res) => {
    const user = await storeUser.index();
    res.json(user);
};
const showUser = async (req, res) => {
    const user = await storeUser.show(req.params.id);
    res.json(user);
};
const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            id: req.body.id,
        };
        const newUser = await storeUser.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const indexProduct = async (_req, res) => {
    const product = await storeProduct.index();
    res.json(product);
};
const showProduct = async (req, res) => {
    const product = await storeProduct.show(req.params.id);
    res.json(product);
};
const producyByCategory = async (req, res) => {
    const product = await storeProduct.show(req.params.category);
    res.json(product);
};
const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            id: req.body.id,
        };
        const newProduct = await storeProduct.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const getActiveOrder = async (req, res) => {
    const order = await userOrder.getActive(req.params.user_id);
    res.json(order);
};
const getCompletedOrder = async (req, res) => {
    const order = await userOrder.getCompleted(req.params.user_id);
    res.json(order);
};
const createOrder = async (req, res) => {
    try {
        const order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            status: req.body.status,
            user_id: req.body.user_id,
            id: req.body.id,
        };
        const newOrder = await userOrder.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
export const userRoutes = (app) => {
    app.get('/user', indexUser);
    app.get('/user/:id', showUser);
    app.post('/user', createUser);
};
export const orderRoutes = (app) => {
    app.get('/order/:user_id', getActiveOrder);
    app.get('/order/:user_id', getCompletedOrder);
    app.post('/order', createOrder);
};
export const productRoutes = (app) => {
    app.get('/product', indexProduct);
    app.get('/product/:id', showProduct);
    app.post('/product', createProduct);
    app.post('/product/:category', producyByCategory);
};

