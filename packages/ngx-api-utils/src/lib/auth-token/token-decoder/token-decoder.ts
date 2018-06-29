import { TokenPayload } from '../token-payload/token-payload';

export class TokenDecoder<T extends TokenPayload = TokenPayload> {
  decode(token: string): T {
    return new TokenPayload() as T;
  }
}
