import models from '../../../shared/infra/database/sequelize/models';
import { MongooseUserTokenRepo } from './implementations/mongooseUserTokenRepo';
import { SequelizeUserRepo } from './implementations/sequelizeUserRepo';

const userRepo = new SequelizeUserRepo(models);
const userTokenRepo = new MongooseUserTokenRepo();

export { userRepo, userTokenRepo };
