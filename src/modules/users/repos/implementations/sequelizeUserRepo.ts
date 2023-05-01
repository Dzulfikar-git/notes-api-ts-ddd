import { User } from '../../domain/user';
import { UserName } from '../../domain/userName';
import { UserMap } from '../../mappers/userMap';
import { IUserRepo } from '../userRepo';

export class SequelizeUserRepo implements IUserRepo {
  private userModel: any;

  constructor(models: any) {
    this.userModel = models.User;
  }

  async exists(username: UserName): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username: username.value } });
    return !!user === true;
  }

  async getUserByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id: userId } });
    if (!!user === false) throw new Error('User not found');
    return UserMap.toDomain(user);
  }

  async getUserByUserName(username: UserName | string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username: username instanceof UserName ? <UserName>username : username },
    });
    if (!!user === false) throw new Error('User not found');
    return UserMap.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const exists = await this.exists(user.username);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await this.userModel.create(rawSequelizeUser);
    }

    return;
  }
}
