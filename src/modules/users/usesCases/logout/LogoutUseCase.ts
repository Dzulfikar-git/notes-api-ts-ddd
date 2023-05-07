import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/user';

import { IUserRepo } from '../../repos/userRepo';
import { IUserTokenRepo } from '../../repos/userTokenRepo';
import { LogoutDTO } from './LogoutDTO';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class LogoutUseCase implements UseCase<any, Promise<Response>> {
  private userRepo: IUserRepo;
  private userTokenRepo: IUserTokenRepo;

  constructor(userRepo: IUserRepo, userTokenRepo: IUserTokenRepo) {
    this.userRepo = userRepo;
    this.userTokenRepo = userTokenRepo;
  }

  public async execute(request: LogoutDTO): Promise<Response> {
    let user: User;
    try {
      user = await this.userRepo.getUserByUserId(request.userId);

      if (!user) {
        return right(Result.ok<void>());
      }

      await this.userTokenRepo.deleteUserRefreshTokens(user.userId.id.toString());

      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error)) as Response;
    }
  }
}
