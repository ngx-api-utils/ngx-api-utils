import {TokenPayload} from 'ngx-api-utils';

/**
 * @see https://www.iana.org/assignments/jwt/jwt.xhtml
 * @see https://tools.ietf.org/html/rfc7519
 * @see https://jwt.io/
 */
export class JwtTokenPayload extends TokenPayload {
  email: string;
  mathRandom: number;
  exp: number;
  iat: number;

  constructor(rawPayload: Partial<JwtTokenPayload>) {
    super();
    Object.assign(this, rawPayload);
  }
}
