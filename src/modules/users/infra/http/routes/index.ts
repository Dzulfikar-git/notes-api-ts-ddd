import express from 'express';
import { Middleware } from '../../../../../shared/infra/http/utils/Middleware';
import { Passport } from '../../../../../shared/infra/http/utils/Passport';
import { userRepo } from '../../../repos';
import { createUserController } from '../../../usesCases/createUser';
import { getUserProfileController } from '../../../usesCases/getUserProfile';
import { loginController } from '../../../usesCases/login';

const userRouter = express.Router();
const middleware = new Middleware(new Passport(userRepo));

userRouter.post('/', (req, res) => createUserController.execute(req, res));

userRouter.get('/profile', middleware.ensureAuthenticated(), (req, res) => getUserProfileController.execute(req, res));

userRouter.post('/login', (req, res) => loginController.execute(req, res));

// userRouter.post('/logout', middleware.ensureAuthenticated(), (req, res) => logoutController.execute(req, res));

// userRouter.post('/token/refresh', (req, res) => refreshAccessTokenController.execute(req, res));

export { userRouter };
