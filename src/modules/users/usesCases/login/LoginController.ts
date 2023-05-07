import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../infra/http/models/decodedRequest';
import { LoginDTO, LoginDTOResponse } from './LoginDTO';
import { LoginUseCaseErrors } from './LoginErrors';
import { LoginUserUseCase } from './LoginUseCase';

export class LoginController extends BaseController {
  private useCase: LoginUserUseCase;

  constructor(useCase: LoginUserUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto = req.body as LoginDTO;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case LoginUseCaseErrors.UserNameDoesntExistError:
            return this.badRequest(res, error.getErrorValue().message);
          case LoginUseCaseErrors.PasswordDoesntMatchError:
            return this.badRequest(res, error.getErrorValue().message);
          default:
            return this.badRequest(res, error.getErrorValue());
        }
      }

      return this.ok<LoginDTOResponse>(res, result as LoginDTOResponse);
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
