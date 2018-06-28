import { TokenPayload } from '../token-payload/token-payload';

export abstract class TokenDecoder<T extends TokenPayload> {
  abstract decode(token: string): T;
}
