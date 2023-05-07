import { JWTToken, RefreshToken } from '../../domain/jwt';

export interface RefreshTokenDTO {
  refresh_token: string;
}

export interface RefreshTokenDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}
