import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../infra/http/models/decodedRequest';
import { RefreshTokenDTO, RefreshTokenDTOResponse } from './RefreshTokenDTO';
import { RefreshTokenErrors } from './RefreshTokenErrors';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController extends BaseController {
  private useCase: RefreshTokenUseCase;

  constructor(useCase: RefreshTokenUseCase) {
    super();
    this.useCase = useCase;
  }

  public async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto = req.body as RefreshTokenDTO;

    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case RefreshTokenErrors.RefreshTokenDoesntExistError:
            return this.badRequest(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      }

      return this.ok<RefreshTokenDTOResponse>(res, result as RefreshTokenDTOResponse);
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
