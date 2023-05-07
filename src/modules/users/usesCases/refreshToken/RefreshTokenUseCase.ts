import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { Passport } from '../../../../shared/infra/http/utils/Passport';
import { IUserRepo } from '../../repos/userRepo';
import { IUserTokenRepo } from '../../repos/userTokenRepo';
import { RefreshTokenDTO, RefreshTokenDTOResponse } from './RefreshTokenDTO';
import { RefreshTokenErrors } from './RefreshTokenErrors';

type Response = Either<
  RefreshTokenErrors.RefreshTokenDoesntExistError | AppError.UnexpectedError | Result<any>,
  Result<RefreshTokenDTOResponse>
>;

export class RefreshTokenUseCase implements UseCase<RefreshTokenDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private userTokenRepo: IUserTokenRepo;

  constructor(userRepo: IUserRepo, userTokenRepo: IUserTokenRepo) {
    this.userRepo = userRepo;
    this.userTokenRepo = userTokenRepo;
  }

  public async execute(request: RefreshTokenDTO): Promise<Response> {
    try {
      const refreshToken = await this.userTokenRepo.getUserRefreshToken(request.refresh_token);

      if (!refreshToken) {
        return left(new RefreshTokenErrors.RefreshTokenDoesntExistError()) as Response;
      }

      const user = await this.userRepo.getUserByUserId(refreshToken.userId.id.toString());

      const accessToken = Passport.signJWT(user.userId.id.toString(), user.username.value.toString());

      return right(
        Result.ok<RefreshTokenDTOResponse>({
          accessToken: accessToken,
          refreshToken: refreshToken.refreshToken,
        })
      ) as Response;
    } catch (error) {
      return left(new RefreshTokenErrors.RefreshTokenDoesntExistError()) as Response;
    }
  }
}
