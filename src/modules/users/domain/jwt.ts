export interface JWTClaims {
  userId: string;
  username: string;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
