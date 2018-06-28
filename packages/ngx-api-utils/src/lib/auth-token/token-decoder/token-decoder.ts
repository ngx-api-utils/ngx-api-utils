import { TokenPayload } from '../token-payload/token-payload';

export interface TokenDecoder<T extends TokenPayload> {
  decode(token: string): T;
}
