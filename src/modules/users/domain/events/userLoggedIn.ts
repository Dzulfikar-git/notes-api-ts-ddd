import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { User } from '../user';

export class UserLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
