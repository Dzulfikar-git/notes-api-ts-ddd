import { userRepo, userTokenRepo } from '../../repos';
import { LogoutController } from './LogoutController';
import { LogoutUseCase } from './LogoutUseCase';

const logoutUseCase = new LogoutUseCase(userRepo, userTokenRepo);
const logoutController = new LogoutController(logoutUseCase);

export { logoutUseCase, logoutController };
