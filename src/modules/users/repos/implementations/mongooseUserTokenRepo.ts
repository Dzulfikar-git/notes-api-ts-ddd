import * as randToken from 'rand-token';
import UserToken from '../../../../shared/infra/database/mongoose/schemas/UserToken';
import { User } from '../../domain/user';
import { IUserTokenRepo } from '../userTokenRepo';

export class MongooseUserTokenRepo implements IUserTokenRepo {
  async createUserRefreshToken(user: User): Promise<string> {
    try {
      const userRefreshToken = await UserToken.create({
        user_id: user.userId.id.toString(),
        refresh_token: randToken.uid(256),
      });

      return userRefreshToken.refresh_token;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserRefreshTokens(userId: string): Promise<void> {
    try {
      await UserToken.deleteMany({ user_id: userId });
    } catch (error) {
      throw error;
    }
  }
}
