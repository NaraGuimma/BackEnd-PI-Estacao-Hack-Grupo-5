import { Request, Response } from 'express';
import db from '../database/connection';
export default class UsersController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const email = filters.email as string;

    if (!filters.email) {
      return response.status(400).json({
        error: 'Missing filters to search users',
      });
    }

    const users = await db('users')
      .where('users.email', '=', email)
      .select('users.*');

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const trx = await db.transaction();

    try {
      await trx('users').insert({
        name,
        email,
        password,
      });

      await trx.commit();
      return response.status(201).send();
    } catch (err) {
      await trx.rollback();
      console.log(err);
      return response.status(400).send({
        error: 'Unexpected error while creating new user',
      });
    }
  }

  async main(request: Request, response: Response) {
    try {
      const users = await db('users').select('users.*');

      return response.json(users);
    } catch (error) {
      return response.status(400).send({
        error: 'Unexpected error while creating new user',
      });
    }
  }
}
