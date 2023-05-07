import * as jwt from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { authConfig } from '../../../../config';
import { IUserRepo } from '../../../../modules/users/repos/userRepo';

export class Passport {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
    this.initializeJwtStrategy();
  }

  private configuration(): StrategyOptions {
    return {
      secretOrKey: authConfig.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  }

  public decodeJWT(token: string) {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, (error, payload) => {
        if (error) {
          return reject(error);
        }
        return resolve(payload);
      })({ headers: { authorization: token } });
    });
  }

  public static signJWT(userId: string, username: string): string {
    return jwt.sign({ userId: userId, username: username }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }

  public initializeJwtStrategy() {
    return passport.use(
      new Strategy(this.configuration(), async (payload: any, done) => {
        try {
          const user = await this.userRepo.getUserByUserId(payload.userId);
          if (!user) return done(null, false);
          return done(null, { userId: user.userId.id.toString(), username: user.username.props.name.toString() });
        } catch (error) {
          return done(error);
        }
      })
    );
  }
}
