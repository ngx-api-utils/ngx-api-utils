export interface TokenPayload {
  /**
   * Shows if the token is valid, e.g. it has not expired
   */
  isValid(): boolean;
  expires?(): Date;
}
