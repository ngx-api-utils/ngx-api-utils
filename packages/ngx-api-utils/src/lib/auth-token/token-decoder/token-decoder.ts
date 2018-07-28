import {Injectable} from '@angular/core';
import {TokenPayload} from '../token-payload/token-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenDecoder<T extends TokenPayload = TokenPayload> {
  decode(token: string): T {
    return new TokenPayload() as T;
  }
}
