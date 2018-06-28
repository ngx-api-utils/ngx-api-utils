export abstract class TokenPayload {
  /**
   * Shows if the token is valid, e.g. it has not expired
   */
  isValid() {
    return this.expires ? Date.now() < this.expires().valueOf() : true;
  }
  abstract expires?(): Date;
}
