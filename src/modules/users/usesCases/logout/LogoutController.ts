import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../infra/http/models/decodedRequest';
import { LogoutDTO } from './LogoutDTO';
import { LogoutUseCase } from './LogoutUseCase';

export class LogoutController extends BaseController {
  private useCase: LogoutUseCase;

  constructor(useCase: LogoutUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    try {
      const dto = req.decoded as LogoutDTO;

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        return this.fail(res, result.value.getErrorValue().message);
      }

      return this.ok<void>(res);
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
