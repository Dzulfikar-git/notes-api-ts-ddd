import { rateLimit } from 'express-rate-limit';
import { appConfig } from '../../../../config/app';
import { Passport } from './Passport';

export class Middleware {
  private passport: Passport;

  constructor(passport: Passport) {
    this.passport = passport;
  }

  private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
    return res.status(status).send({ message });
  }

  public ensureAuthenticated() {
    return async (req, res, next) => {
      const token = req.headers['authorization'];
      // Confirm that the token was signed with our signature.
      if (token) {
        const decoded = await this.passport.decodeJWT(token);

        if (decoded) {
          req.decoded = decoded;
          return next();
        } else {
          return this.endRequest(403, 'Auth token failed, token might expires or user not logged in.', res);
        }
      } else {
        return this.endRequest(403, 'No access token provided', res);
      }
    };
  }

  public static createRateLimit(mins: number, maxRequests: number) {
    return rateLimit({
      windowMs: mins * 60 * 1000,
      max: maxRequests,
    });
  }

  public static restrictedUrl(req, res, next) {
    if (!appConfig.isProduction) {
      return next();
    }

    const approvedDomainList = ['*'];

    const domain = req.headers.origin;

    const isValidDomain = !!approvedDomainList.find((d) => d === domain);
    console.log(`Domain =${domain}, valid?=${isValidDomain}`);

    if (!isValidDomain) {
      return res.status(403).json({ message: 'Unauthorized' });
    } else {
      return next();
    }
  }
}
