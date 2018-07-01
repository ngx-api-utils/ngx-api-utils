import { Injectable, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenPayload } from './token-payload/token-payload';
import { TokenStorage } from './token-storage/token-storage';
import { TokenDecoder } from './token-decoder/token-decoder';
import { AUTH_TOKEN_NAME } from './auth-token-name';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService<T extends TokenPayload = TokenPayload> implements OnDestroy {

  /**
   * RxJS BehaviorSubject that stores the token so that observers can subscribe to the subject to receive
   * the last (or initial) value and all subsequent notifications.
   * WARNING: This stream never completes, so you have to unsubscribe manually from it!!!
   *
   * In most cases it should be sufficient to just use {@link AuthTokenService#value} in case you are not
   * interested in changes over time
   */
  readonly value$: BehaviorSubject<string | undefined>;

  /**
   * The current raw value of the token
   */
  get value(): string | undefined {
    return this.value$.value;
  }

  get payload(): undefined | Readonly<T> {
    return this._tokenPayload;
  }

  protected authTokenName = 'id_token';
  protected _tokenPayload: undefined | Readonly<T> = undefined;

  constructor(
    protected storage: TokenStorage,
    protected decoder: TokenDecoder<T>,
    @Optional() @Inject(AUTH_TOKEN_NAME) authTokenName?: string
  ) {
    this.authTokenName = authTokenName || this.authTokenName;
    this.value$ = new BehaviorSubject(this.getToken());
    this.value$.subscribe((token) => this.setToken(token));
  }

  ngOnDestroy() {
    this.value$.unsubscribe();
  }

  isValid(): boolean {
    return !!(this.payload && this.payload.isValid());
  }

  protected setToken(token: string | undefined) {
    if (token) {
      this.storage.setItem(this.authTokenName, token);
      this._tokenPayload = Object.freeze(this.decoder.decode(token));
    } else {
      this.storage.removeItem(this.authTokenName);
      this._tokenPayload = undefined;
    }
  }

  protected getToken() {
    return this.storage.getItem(this.authTokenName);
  }
}

