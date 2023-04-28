import * as bcrypt from 'bcrypt';
import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        username: 'john doe',
        password: bcrypt.hashSync('password1', 12),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('users', {});
  },
};
