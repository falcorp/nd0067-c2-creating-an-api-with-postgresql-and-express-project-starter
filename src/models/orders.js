"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrder = void 0;
const database_1 = __importDefault(require("../database"));
class UserOrder {
    async getActive(user_id) {
        try {
            const sql = 'SELECT * FROM order WHERE user_id=($1) AND status=active';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find active order for user ${user_id}. Error: ${err}`);
        }
    }
    async getCompleted(user_id) {
        try {
            const sql = 'SELECT * FROM order WHERE user_id=($1) AND status=complete';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find completed order for user ${user_id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = 'INSERT INTO order (product_id, quantity, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
}
exports.UserOrder = UserOrder;
