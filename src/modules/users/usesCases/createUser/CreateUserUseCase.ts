import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';

type Response = Either<CreateUserErrors.UsernameTakenError | AppError.UnexpectedError | Result<any>, Result<void>>;

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: CreateUserDTO): Promise<Response> {
    const usernameOrError = UserName.create({ name: request.username });
    const passwordOrError = UserPassword.create({ value: request.password });

    const dtoResult = Result.combine([usernameOrError, passwordOrError]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const password: UserPassword = passwordOrError.getValue();
    const username: UserName = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.userRepo.exists(username);

      if (userAlreadyExists) {
        return left(new CreateUserErrors.UsernameTakenError(username.value)) as Response;
      }

      const userOrError: Result<User> = User.create({
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(Result.fail<User>(userOrError.getErrorValue().toString())) as Response;
      }

      const user: User = userOrError.getValue();

      await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
