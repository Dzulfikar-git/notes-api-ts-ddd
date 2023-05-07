import * as jwt from 'jsonwebtoken';
import * as randToken from 'rand-token';
import { authConfig } from '../../../../config';
import { JWTClaims, JWTToken, RefreshToken } from '../../domain/jwt';
import { IUserTokenRepo } from '../../repos/userTokenRepo';
import { IAuthService } from '../authService';

export default class AuthService implements IAuthService {
  private userTokenRepo: IUserTokenRepo;

  constructor(userTokenRepo: IUserTokenRepo) {
    this.userTokenRepo = userTokenRepo;
  }

  signJWT(props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      username: props.username,
      userId: props.userId,
    };

    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  decodeJWT(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    });
  }

  createRefreshToken(): RefreshToken {
    return randToken.uid(256) as RefreshToken;
  }

  getTokens(username: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  refreshTokenExists(refreshToken: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getUserNameFromRefreshToken(refreshToken: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
