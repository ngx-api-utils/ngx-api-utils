export abstract class TokenPayload {
  /**
   * Shows if the token is valid, e.g. it has not expired
   */
  abstract isValid(): boolean;
  abstract expires?(): Date;
}
