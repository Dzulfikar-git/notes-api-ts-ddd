import * as randToken from 'rand-token';
import { User } from '../../domain/user';
import { UserToken } from '../../domain/userToken';
import { UserTokenMap } from '../../mappers/userTokenMap';
import { IUserTokenRepo } from '../userTokenRepo';

export class MongooseUserTokenRepo implements IUserTokenRepo {
  private userTokenModel: any;

  constructor(userTokenModel: any) {
    this.userTokenModel = userTokenModel;
  }

  async createUserRefreshToken(user: User): Promise<string> {
    try {
      const userRefreshToken = await this.userTokenModel.create({
        user_id: user.userId.id.toString(),
        refresh_token: randToken.uid(256),
      });

      return userRefreshToken.refresh_token;
    } catch (error) {
      throw error;
    }
  }

  async getUserRefreshToken(key: string): Promise<UserToken> {
    const userToken = await this.userTokenModel.findOne({ refresh_token: key });
    if (!userToken) throw new Error('User token not found');
    return UserTokenMap.toDomain(userToken);
  }

  async deleteUserRefreshTokens(userId: string): Promise<void> {
    try {
      await this.userTokenModel.deleteMany({ user_id: userId });
    } catch (error) {
      throw error;
    }
  }
}
