import * as express from 'express';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { DecodedExpressRequest } from '../../infra/http/models/decodedRequest';
import { GetUserProfileDTO, GetUserProfileResponseDTO } from './GetUserProfileDTO';
import { GetUserProfileErrors } from './GetUserProfileErrors';
import { GetUserProfileUseCase } from './GetUserProfileUseCase';

export class GetUserProfileController extends BaseController {
  private useCase: GetUserProfileUseCase;

  constructor(useCase: GetUserProfileUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetUserProfileDTO = req.decoded as GetUserProfileDTO;

    try {
      const result = await this.useCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GetUserProfileErrors.UserNotFoundError:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue());
        }
      } else {
        return this.ok<GetUserProfileResponseDTO>(res, result as GetUserProfileResponseDTO);
      }
    } catch (error) {
      return this.fail(res, error);
    }
  }
}
