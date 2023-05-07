import { AppError } from '../../../../shared/core/AppError';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { UserId } from '../../domain/userId';
import { IUserRepo } from '../../repos/userRepo';
import { GetUserProfileDTO, GetUserProfileResponseDTO } from './GetUserProfileDTO';
import { GetUserProfileErrors } from './GetUserProfileErrors';

type Response = Either<
  GetUserProfileErrors.UserNotFoundError | AppError.UnexpectedError | Result<any>,
  Result<GetUserProfileResponseDTO>
>;

export class GetUserProfileUseCase {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: GetUserProfileDTO): Promise<Response> {
    try {
      const userIdOrError = UserId.create(new UniqueEntityID('a67bf1f6-b94a-49d9-afb0-06dd4e8dfee8'));

      const dtoResult = Result.combine([userIdOrError]);

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
      }

      const userId: UserId = userIdOrError.getValue();

      const user = await this.userRepo.getUserByUserId(userId.id.toString());

      if (!user) {
        return left(new GetUserProfileErrors.UserNotFoundError(userId.id.toString())) as Response;
      }

      return right(
        Result.ok<GetUserProfileResponseDTO>({
          userId: user.userId.id.toString(),
          username: user.username.value,
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
