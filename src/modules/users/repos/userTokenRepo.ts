import { RefreshToken } from '../domain/jwt';
import { User } from '../domain/user';

export interface IUserTokenRepo {
  createUserRefreshToken(user: User): Promise<RefreshToken>;
  deleteUserRefreshTokens(userId: string): Promise<void>;
}
