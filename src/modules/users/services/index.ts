import { userTokenRepo } from '../repos';
import AuthService from './implementations/authService';

const authService = new AuthService(userTokenRepo);

export { authService };
