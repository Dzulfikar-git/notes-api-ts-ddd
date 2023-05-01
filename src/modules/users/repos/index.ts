import models from '../../../shared/infra/database/sequelize/models';
import { SequelizeUserRepo } from './implementations/sequelizeUserRepo';

const userRepo = new SequelizeUserRepo(models);

export { userRepo };
