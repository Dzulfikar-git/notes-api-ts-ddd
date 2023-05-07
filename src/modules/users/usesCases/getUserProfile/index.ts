import { userRepo } from '../../repos';
import { GetUserProfileController } from './GetUserProfileController';
import { GetUserProfileUseCase } from './GetUserProfileUseCase';

const getUserProfileUserCase = new GetUserProfileUseCase(userRepo);
const getUserProfileController = new GetUserProfileController(getUserProfileUserCase);

export { getUserProfileUserCase, getUserProfileController };
