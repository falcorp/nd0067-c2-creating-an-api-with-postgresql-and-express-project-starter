"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProduct = void 0;
const database_1 = __importDefault(require("../database"));
class StoreProduct {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get product. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM product WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO product (name, price, category) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }
    async byCategory(category) {
        try {
            const sql = 'SELECT * FROM product WHERE category=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find products in category ${category}. Error: ${err}`);
        }
    }
}
exports.StoreProduct = StoreProduct;
