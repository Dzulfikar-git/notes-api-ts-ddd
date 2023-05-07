import { Mapper } from '../../../shared/infra/Mapper';
import { UserToken } from '../domain/userToken';
import { UserTokenDTO } from '../dtos/userTokenDTO';

export class UserTokenMap implements Mapper<UserToken> {
  public static toDTO(userToken: UserToken): UserTokenDTO {
    return {
      user_id: userToken.userId.id.toString(),
      refresh_token: userToken.refreshToken,
      expires_at: userToken.expiresAt,
    };
  }

  public static toDomain(raw: any): UserToken {
    const userTokenOrError = UserToken.create(
      {
        userId: raw.user_id,
        refreshToken: raw.refresh_token,
        expiresAt: raw.expires_at,
      },
      raw.id
    );

    userTokenOrError.isFailure ? console.log(userTokenOrError.getErrorValue()) : '';

    return userTokenOrError.isSuccess ? userTokenOrError.getValue() : null;
  }

  public static toPersistence(userToken: UserToken): any {
    return {
      user_id: userToken.userId.id.toString(),
      refresh_token: userToken.refreshToken,
      expires_at: userToken.expiresAt,
    };
  }
}
