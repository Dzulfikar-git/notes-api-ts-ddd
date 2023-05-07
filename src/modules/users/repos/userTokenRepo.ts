import { RefreshToken } from '../domain/jwt';
import { User } from '../domain/user';
import { UserToken } from '../domain/userToken';

export interface IUserTokenRepo {
  createUserRefreshToken(user: User): Promise<RefreshToken>;
  getUserRefreshToken(key: string): Promise<UserToken>;
  deleteUserRefreshTokens(userId: string): Promise<void>;
}
