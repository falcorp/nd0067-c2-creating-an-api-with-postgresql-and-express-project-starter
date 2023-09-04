"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreUser = void 0;
const database_1 = __importDefault(require("../database"));
class StoreUser {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get user. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM user WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO user (firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
        }
    }
}
exports.StoreUser = StoreUser;
