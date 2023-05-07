import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { UserId } from './userId';

interface UserTokenProps {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
}

export class UserToken extends AggregateRoot<UserTokenProps> {
  get userId(): UserId {
    return UserId.create(new UniqueEntityID(this.props.userId)).getValue();
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  private constructor(props: UserTokenProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserTokenProps, id?: UniqueEntityID): Result<UserToken> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.userId, argumentName: 'user_id' }]);

    if (guardResult.isFailure) {
      return Result.fail<UserToken>(guardResult.getErrorValue());
    }

    const userToken = new UserToken(props, id);

    return Result.ok<UserToken>(userToken);
  }
}
