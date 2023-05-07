import { userRepo, userTokenRepo } from '../../repos';
import { RefreshTokenController } from './RefreshTokenController';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

const refreshTokenUseCase = new RefreshTokenUseCase(userRepo, userTokenRepo);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);

export { refreshTokenController, refreshTokenUseCase };
