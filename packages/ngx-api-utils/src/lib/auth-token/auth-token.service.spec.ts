import {TestBed, inject, tick, fakeAsync} from '@angular/core/testing';
// TODO: Make sure to remove `rxjs-compat` when this https://github.com/angular/zone.js/issues/1091 is resolved
import 'zone.js/dist/zone-patch-rxjs-fake-async';

import {AuthTokenService} from './auth-token.service';
import {TokenPayload} from './token-payload/token-payload';
import {TokenStorage} from './token-storage/token-storage';
import {TokenDecoder} from './token-decoder/token-decoder';
import {AUTH_TOKEN_AUTO_REMOVE} from './auth-token-auto-remove';

describe('AuthTokenService', () => {
  let tokenStored: string;
  let tokenStorage: jasmine.SpyObj<TokenStorage>;
  let tokenPayload: TokenPayload;
  let tokenDecoder: jasmine.SpyObj<TokenDecoder<TokenPayload>>;
  beforeEach(() => {
    tokenStored = undefined;
    tokenStorage = jasmine.createSpyObj('tokenStorage', ['getItem', 'setItem', 'removeItem']);
    tokenStorage.getItem.and.callFake(() => {
      return tokenStored;
    });
    tokenStorage.setItem.and.callFake((__key: any, value: any) => {
      tokenStored = value;
    });
    tokenStorage.removeItem.and.callFake(() => {
      tokenStored = undefined;
    });
    tokenPayload = new (class extends TokenPayload {
      amr = 'Admin';
      iat = Date.now();
      get expires() {
        return Date.now() + 3600000;
      }
    })();
    tokenDecoder = jasmine.createSpyObj('tokenDecoder', ['decode']);
    tokenDecoder.decode.and.callFake((token: string) => {
      return tokenPayload;
    });
    TestBed.configureTestingModule({
      providers: [
        AuthTokenService,
        {
          provide: TokenStorage,
          useValue: tokenStorage
        },
        {
          provide: TokenDecoder,
          useValue: tokenDecoder
        },
        {
          provide: AUTH_TOKEN_AUTO_REMOVE,
          useValue: false
        }
      ]
    });
  });

  it('should be created', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
    expect(service).toBeTruthy();
  }));

  describe('when no token was stored', () => {
    it('should have no token', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      expect(service.value).toBeUndefined();
      expect(service.payload).toBeUndefined();
      expect(service.isValid()).toBeFalsy();
    }));
  });

  describe('when a token was stored', () => {
    beforeEach(() => {
      tokenStored = 'some fake token stored';
    });
    it('should have a valid token', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      expect(service.value).toBeTruthy();
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
    }));
  });

  describe('when a token changes in sequence', () => {
    it('should notify and store the value', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      const subscriberSpy = jasmine.createSpy('subscriberSpy');
      service.value$.subscribe(token => subscriberSpy(token));
      const tokenRawSequence = ['1', '2', undefined, '4', undefined];

      expect(service.value).toBeUndefined();
      expect(service.payload).toBeUndefined();
      expect(service.isValid()).toBeFalsy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toBeUndefined();

      service.value$.next(tokenRawSequence[0]);
      expect(service.value).toEqual(tokenRawSequence[0]);
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenRawSequence[0]);

      service.value$.next(tokenRawSequence[1]);
      expect(service.value).toEqual(tokenRawSequence[1]);
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenRawSequence[1]);

      service.value$.next(tokenRawSequence[2]);
      expect(service.value).toEqual(tokenRawSequence[2]);
      expect(service.payload).toBeFalsy();
      expect(service.isValid()).toBeFalsy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenRawSequence[2]);

      service.value$.next(tokenRawSequence[3]);
      expect(service.value).toEqual(tokenRawSequence[3]);
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenRawSequence[3]);

      service.value$.next(tokenRawSequence[4]);
      expect(service.value).toEqual(tokenRawSequence[4]);
      expect(service.payload).toBeFalsy();
      expect(service.isValid()).toBeFalsy();
      expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenRawSequence[4]);
    }));
  });

  describe('when a token is expired', () => {
    beforeEach(() => {
      spyOnProperty(tokenPayload, 'expires').and.callFake(() => {
        return Date.now() - 1;
      });
      tokenStored = 'fake';
    });
    it('should not be valid', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      expect(service.value).toBeTruthy();
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeFalsy();
    }));
    it('should be auto removed if configured so', () => {
      TestBed.overrideProvider(AUTH_TOKEN_AUTO_REMOVE, {useValue: true});
      return inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
        expect(service.value).toBeFalsy();
        expect(service.payload).toBeUndefined();
        expect(service.isValid()).toBeFalsy();
      })();
    });
  });

  describe('when a token expires after time', () => {
    let expiresAt: number;
    const expiresAfter = 3600000;
    beforeEach(() => {
      expiresAt = Date.now() + expiresAfter;
      spyOnProperty(tokenPayload, 'expires').and.callFake(() => {
        return expiresAt;
      });
      tokenStored = 'fake';
    });
    it('should be valid initially', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      expect(service.value).toBeTruthy();
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
    }));
    it('should be auto removed if configured so', fakeAsync(() => {
      TestBed.overrideProvider(AUTH_TOKEN_AUTO_REMOVE, {useValue: true});
      return inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
        tick(expiresAfter + 1);
        expect(service.value).toBeFalsy();
        expect(service.payload).toBeUndefined();
        expect(service.isValid()).toBeFalsy();
      })();
    }));
  });

  describe('when a token is not valid', () => {
    beforeEach(() => {
      spyOnProperty(tokenPayload, 'expires').and.callFake(() => {
        return Date.now() + 3600000;
      });
      spyOn(tokenPayload, 'isValid').and.callFake(() => {
        return false;
      });
      tokenStored = 'fake';
    });
    it('should not be valid', inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
      expect(service.value).toBeTruthy();
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeFalsy();
    }));
    it('should be auto removed if configured so', () => {
      TestBed.overrideProvider(AUTH_TOKEN_AUTO_REMOVE, {useValue: true});
      return inject([AuthTokenService], (service: AuthTokenService<TokenPayload>) => {
        expect(service.value).toBeFalsy();
        expect(service.payload).toBeUndefined();
        expect(service.isValid()).toBeFalsy();
      })();
    });
  });
});
