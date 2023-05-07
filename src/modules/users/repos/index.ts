import UserToken from '../../../shared/infra/database/mongoose/schemas/UserToken';
import models from '../../../shared/infra/database/sequelize/models';
import { MongooseUserTokenRepo } from './implementations/mongooseUserTokenRepo';
import { SequelizeUserRepo } from './implementations/sequelizeUserRepo';

const userRepo = new SequelizeUserRepo(models);
const userTokenRepo = new MongooseUserTokenRepo(UserToken);

export { userRepo, userTokenRepo };
