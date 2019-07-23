import { camelizeKeys } from 'humps';
import { db } from '../../global';

export const User = {
  async getUserByEmail(email) {
    return camelizeKeys(
      await db
        .select(
          'user.id as id',
          'user.email as email',
          'user.created_at as created_at',
          'user.updated_at as updated_at',
        )
        .from('user')
        .where('user.email', '=', email)
        .first()
    ); 
  },
  async getUserById(id) {
    return camelizeKeys(
      await db
        .select(
          'user.id as id',
          'user.email as email',
          'user.created_at as created_at',
          'user.updated_at as updated_at',
        )
        .from('user')
        .where('user.id', '=', id)
        .first()
    ); 
  },

  async addUser(user) {
    return db('user').insert(user);
  }
};
