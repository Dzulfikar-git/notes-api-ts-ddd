import { Result } from '../../../../shared/core/Result';
import { UseCaseError } from '../../../../shared/core/UseCaseError';

export namespace RefreshTokenErrors {
  export class RefreshTokenDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Refresh token doesn't exist.`,
      } as UseCaseError);
    }
  }
}
