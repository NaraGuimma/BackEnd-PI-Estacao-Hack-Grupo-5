"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class UsersController {
    async index(request, response) {
        const filters = request.query;
        const email = filters.email;
        if (!filters.email) {
            return response.status(400).json({
                error: 'Missing filters to search users',
            });
        }
        const users = await connection_1.default('users')
            .where('users.email', '=', email)
            .select('users.*');
        return response.json(users);
    }
    async create(request, response) {
        const { name, email, password } = request.body;
        const trx = await connection_1.default.transaction();
        try {
            await trx('users').insert({
                name,
                email,
                password,
            });
            await trx.commit();
            return response.status(201).send();
        }
        catch (err) {
            await trx.rollback();
            console.log(err);
            return response.status(400).send({
                error: 'Unexpected error while creating new user',
            });
        }
    }
    async main(request, response) {
        try {
            const users = await connection_1.default('users').select('users.*');
            return response.json(users);
        }
        catch (error) {
            return response.status(400).send({
                error: 'Unexpected error while creating new user',
            });
        }
    }
}
exports.default = UsersController;
