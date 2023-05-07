import { userRepo, userTokenRepo } from '../../repos';
import { LoginController } from './LoginController';
import { LoginUserUseCase } from './LoginUseCase';

const loginUseCase = new LoginUserUseCase(userRepo, userTokenRepo);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase };
