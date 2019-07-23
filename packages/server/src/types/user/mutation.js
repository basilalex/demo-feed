import { ApolloError } from 'apollo-server';
import { UserInputError } from 'apollo-server-errors';

import { User } from './User';
import { createTokens } from '../auth';

export const mutation = {
  async login(parent, { email, password }, { identity }) {
    try {
      const user = await User.getUserByEmail(email);
      // validate password
      const tokens = await createTokens(user);

      return { user, tokens };
    } catch (e) {
      return new UserInputError(e.message, e.code);
    }
  },

  async register(parent, { email, password }) {
    try {
      // validate input values
      let user = await User.getUserByEmail(email);

      if (user) {
        throw new Error(`This email(${email}) already exists`);
      }

      await User.addUser({ email, password });
      user = await User.getUserByEmail(email);
      const tokens = await createTokens(user);

      return { user, tokens };
    } catch (e) {
      return new UserInputError(e.message, e.code);
    }
  },
};
