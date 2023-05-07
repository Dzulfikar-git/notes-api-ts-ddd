import * as jwt from 'jsonwebtoken';
import { authConfig } from '../../../../config';
import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { RefreshToken } from '../../domain/jwt';
import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../../repos/userRepo';
import { IUserTokenRepo } from '../../repos/userTokenRepo';
import { LoginDTO, LoginDTOResponse } from './LoginDTO';
import { LoginUseCaseErrors } from './LoginErrors';

type Response = Either<
  | LoginUseCaseErrors.UserNameDoesntExistError
  | LoginUseCaseErrors.PasswordDoesntMatchError
  | AppError.UnexpectedError
  | Result<any>,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  private userTokenRepo: IUserTokenRepo;

  constructor(userRepo: IUserRepo, userTokenRepo: IUserTokenRepo) {
    this.userRepo = userRepo;
    this.userTokenRepo = userTokenRepo;
  }

  public async execute(request: LoginDTO): Promise<Response> {
    let user: User;
    let username: UserName;
    let password: UserPassword;

    try {
      const usernameOrError = UserName.create({ name: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return left(Result.fail<void>(payloadResult.getErrorValue())) as Response;
      }

      username = usernameOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepo.getUserByUserName(username);

      if (!user) {
        return left(new LoginUseCaseErrors.UserNameDoesntExistError()) as Response;
      }

      const passwordValid = await user.password.comparePassword(password.value);

      if (!passwordValid) {
        return left(new LoginUseCaseErrors.PasswordDoesntMatchError()) as Response;
      }

      const accessToken = jwt.sign(
        { userId: user.userId.id.toString(), username: user.username.value.toString() },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        }
      );

      const refreshToken: RefreshToken = await this.userTokenRepo.createUserRefreshToken(user);

      user.setAccessToken(accessToken, refreshToken);

      return right(
        Result.ok<LoginDTOResponse>({
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        })
      );
    } catch (error) {
      return left(new AppError.UnexpectedError(error));
    }
  }
}
