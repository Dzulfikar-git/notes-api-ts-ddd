import { JWTClaims, JWTToken, RefreshToken } from '../domain/jwt';

export interface IAuthService {
  signJWT(props: JWTClaims): JWTToken;
  decodeJWT(token: string): Promise<any>;
  createRefreshToken(): RefreshToken;
  getTokens(username: string): Promise<string[]>;
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
  getUserNameFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}
