import { Injectable, OnDestroy, Optional, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, never, Subscription } from 'rxjs';
import { switchMap, delay, race, filter, map } from 'rxjs/operators';
import { TokenPayload } from './token-payload/token-payload';
import { TokenStorage } from './token-storage/token-storage';
import { TokenDecoder } from './token-decoder/token-decoder';
import { AUTH_TOKEN_NAME } from './auth-token-name';
import { AUTH_TOKEN_AUTO_REMOVE } from './auth-token-auto-remove';

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
  protected autoRemoveTokenSubscription: Subscription;
  protected clearTokenWhenNotValidSubscription: Subscription;

  constructor(
    protected storage: TokenStorage,
    protected decoder: TokenDecoder<T>,
    @Inject(AUTH_TOKEN_AUTO_REMOVE) protected autoRemove: boolean,
    @Optional() @Inject(AUTH_TOKEN_NAME) authTokenName?: string
  ) {
    this.authTokenName = authTokenName || this.authTokenName;
    this.value$ = new BehaviorSubject(this.getToken());
    this.value$.subscribe((token) => this.setToken(token));
    if (this.autoRemove) {
      this.autoRemoveTokenSubscription = this.removeTokenWhenNotValidOrExpires();
    }
  }

  ngOnDestroy() {
    this.value$.unsubscribe();
    if (this.autoRemoveTokenSubscription) {
      this.autoRemoveTokenSubscription.unsubscribe();
      this.autoRemoveTokenSubscription = undefined;
    }
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
    return this.storage.getItem(this.authTokenName) || undefined;
  }

  protected removeTokenWhenNotValidOrExpires() {
    return this.value$
      .pipe(
        filter(token => !!token),
        race(
          of().pipe(
            switchMap(() => this.whenTokenExpires()),
            map((expires) => {
              return {
                reason: '_token_expired_',
                expires
              };
            })
          ),
          of(this.payload).pipe(
            map(payload => payload.isValid()),
            map(isValid => {
              if (!isValid) {
                return {
                  reason: '_token_not_valid_',
                  isValid
                };
              } else {
                return never();
              }
            })
          )
        )
      )
      .subscribe(() => this.value$.next(undefined));
  }

  protected whenTokenExpires(payload?: T): Observable<number> {
    return of(payload)
      .pipe(
        switchMap(({expires}) => {
          if (expires) {
            // the token has an expiration date, so check and use it
            return of(expires).pipe(delay(expires < Date.now() ? expires : 0));
          } else {
            // the token never expires
            return never();
          }
        })
      );
  }
}

