import { TokenPayload } from 'ngx-api-utils';

export class JwtTokenPayload extends TokenPayload {
  email: string;
  mathRandom: number;
  exp: number;
  iat: number;

  constructor(rawPayload: Partial<JwtTokenPayload>) {
    super();
    Object.assign(this, rawPayload);
  }

  isValid(): boolean {
    return !this.isExpired();
  }

  expires(): Date {
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(this.exp);
    return expirationDate;
  }

  isExpired(): boolean {
    const expirationDate = this.expires();
    if (!expirationDate) {
      return false;
    }
    return !(expirationDate.valueOf() > (new Date().valueOf()));
  }
}
