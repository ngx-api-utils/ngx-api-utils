export class TokenPayload {
  /**
   * Shows if the token is valid, e.g. it has not expired
   */
  isValid() {
    return this.expires ? Date.now() < +this.expires : true;
  }
  /**
   * Unix timestamp in microseconds
   */
  get expires(): number | undefined {
    // by default check the JWT exp property @see https://tools.ietf.org/html/rfc7519#section-4.1.4
    return (this as any)['exp'] && (this as any)['exp'] * 1000;
  }
}
