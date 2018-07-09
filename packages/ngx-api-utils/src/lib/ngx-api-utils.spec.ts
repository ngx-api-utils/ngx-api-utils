import { TestBed, inject } from '@angular/core/testing';
import { NgxApiUtilsModule, AuthTokenService, ApiHttpService, TokenPayload } from '../public_api';
import { Polly } from '@pollyjs/core';
import { TokenDecoder } from './auth-token/public_api';

describe('ngx-api-utils package', () => {
  const apiUtilsConfig = {
    baseUrl: 'http://example.com/api',
    authTokenName: 'id_token',
    defaultHeaders: {
      'accept': 'application/json, */*',
      'X-Client': 'Ngx Api Utils Client'
    },
    authorizationHeaderName: 'Authorization'
  };
  let polly: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxApiUtilsModule.forRoot(apiUtilsConfig)
      ]
    });
    polly = new Polly('ngx-api-utils');
    localStorage.removeItem(apiUtilsConfig.authTokenName);
  });

  afterEach(async () => {
    await polly.stop();
  });

  describe('AuthTokenService', () => {
    const fakeTokenValue = 'fake token value';

    beforeEach(() => {
      // ensure the localStorage is clear
      localStorage.removeItem(apiUtilsConfig.authTokenName);
    });

    it('should be provided', inject([AuthTokenService], (service: AuthTokenService) => {
      expect(service).toBeTruthy();
    }));

    it('should have no token initially and should not be valid', inject([AuthTokenService], (service: AuthTokenService) => {
      expect(service.value).toEqual(undefined);
      expect(service.payload).toEqual(undefined);
      expect(service.isValid()).toBeFalsy();
      expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(null);
    }));

    it('should store whatever value is provided as token and should be valid', inject([AuthTokenService], (service: AuthTokenService) => {
      service.value$.next(fakeTokenValue);
      expect(service.value).toEqual(fakeTokenValue);
      expect(service.payload).toBeTruthy();
      expect(service.isValid()).toBeTruthy();
      expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(fakeTokenValue);
    }));

    it('should load the stored value of the token and should be valid', () => {
      localStorage.setItem(apiUtilsConfig.authTokenName, fakeTokenValue);
      return inject([AuthTokenService], (service: AuthTokenService) => {
        expect(service.value).toEqual(fakeTokenValue);
        expect(service.payload).toBeTruthy();
        expect(service.isValid()).toBeTruthy();
        expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(fakeTokenValue);
      })();
    });

    it('should clear the stored value of the token and should not be valid', inject([AuthTokenService], (service: AuthTokenService) => {
      localStorage.setItem(apiUtilsConfig.authTokenName, fakeTokenValue);
      service.value$.next(undefined);
      expect(service.value).toEqual(undefined);
      expect(service.payload).toEqual(undefined);
      expect(service.isValid()).toBeFalsy();
      expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(null);
    }));

    it('should update the value of the token when changed and should be valid', () => {
      class FakeTokenPayload extends TokenPayload {
        constructor(
          public token: string
        ) {
          super();
        }
      }

      class FakeTokenDecoder extends TokenDecoder {
        decode(token) {
          return new FakeTokenPayload(token);
        }
      }

      TestBed.overrideProvider(TokenDecoder, {
        useValue:  new FakeTokenDecoder()
      });

      return inject(
        [AuthTokenService],
        (service: AuthTokenService<FakeTokenPayload>) => {
          const subscriberSpy = jasmine.createSpy('subscriberSpy');
          service.value$.subscribe((token) => subscriberSpy(token));
          // no stored token yet
          expect(subscriberSpy.calls.mostRecent().args[0]).toBeUndefined();
          // fist token
          const tokenValueFirst = 'fake token first';
          service.value$.next(tokenValueFirst);
          expect(service.value).toEqual(tokenValueFirst);
          expect(service.payload).toBeTruthy();
          expect(service.payload.token).toEqual(tokenValueFirst);
          expect(service.isValid()).toBeTruthy();
          expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenValueFirst);
          expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(tokenValueFirst);
          // second token
          const tokenValueSecond = 'fake token second';
          service.value$.next(tokenValueSecond);
          expect(service.value).toEqual(tokenValueSecond);
          expect(service.payload).toBeTruthy();
          expect(service.payload.token).toEqual(tokenValueSecond);
          expect(service.isValid()).toBeTruthy();
          expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenValueSecond);
          expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(tokenValueSecond);
          // third token
          const tokenValueThird = 'fake token third';
          service.value$.next(tokenValueThird);
          expect(service.value).toEqual(tokenValueThird);
          expect(service.payload).toBeTruthy();
          expect(service.payload.token).toEqual(tokenValueThird);
          expect(service.isValid()).toBeTruthy();
          expect(subscriberSpy.calls.mostRecent().args[0]).toEqual(tokenValueThird);
          expect(localStorage.getItem(apiUtilsConfig.authTokenName)).toEqual(tokenValueThird);
        }
      )();
    });
  });

  describe('ApiHttpService', () => {
    it('should be provided', inject([ApiHttpService], (service: ApiHttpService) => {
      expect(service).toBeTruthy();
    }));

    it('should prefix the requests with the `baseUrl` configured', async () => {
      return inject([ApiHttpService], async (service: ApiHttpService) => {
        const {server} = polly;
        const endpoint = '/products';
        server.get(`${apiUtilsConfig.baseUrl}/*`).intercept((req, res) => {
          res.sendStatus(404);
        });
        server.get(`${apiUtilsConfig.baseUrl}${endpoint}`).intercept((req, res) => {
          res.status(200).json({success: true});
        });
        const {success} = (await service.get<{success: boolean}>(endpoint).toPromise());
        expect(success).toBeTruthy('response should be success');
      })();
    });

    it('should add default configured headers to the requests', async () => {
      return inject([ApiHttpService], async (service: ApiHttpService) => {
        const {server} = polly;
        const endpoint = '/products';
        server.get(`${apiUtilsConfig.baseUrl}/*`).intercept((req, res) => {
          res.sendStatus(404);
        });
        server.get(`${apiUtilsConfig.baseUrl}${endpoint}`).intercept((req, res) => {
          res.status(200).json({success: true, receivedHeaders: req.headers});
        });
        const {success, receivedHeaders} = (await service.get<{success: boolean, receivedHeaders: Object}>(endpoint).toPromise());
        expect(success).toBeTruthy('response should be success');
        const normalizedReceivedHeaders = Object.keys(receivedHeaders).reduce((prev, headerName) => {
          prev[headerName.toLowerCase()] = receivedHeaders[headerName];
          return prev;
        }, {});
        Object.keys(apiUtilsConfig.defaultHeaders).forEach((headerName) => {
          const headerValue = apiUtilsConfig.defaultHeaders[headerName];
          headerName = headerName.toLowerCase();
          expect(normalizedReceivedHeaders[headerName]).toEqual(headerValue);
        });
      })();
    });

    it('should add the authentication token as header', async () => {
      return inject([ApiHttpService, AuthTokenService], async (service: ApiHttpService, authTokenService: AuthTokenService) => {
        const fakeTokenValue = 'fake token value';
        authTokenService.value$.next(fakeTokenValue);
        const {server} = polly;
        const endpoint = '/products';
        server.get(`${apiUtilsConfig.baseUrl}/*`).intercept((req, res) => {
          res.sendStatus(404);
        });
        server.get(`${apiUtilsConfig.baseUrl}${endpoint}`).intercept((req, res) => {
          res.status(200).json({success: true, authToken: req.headers[apiUtilsConfig.authorizationHeaderName]});
        });
        const {success, authToken} = (await service.get<{success: boolean, authToken: string}>(endpoint).toPromise());
        expect(success).toBeTruthy('response should be success');
        expect(authToken).toEqual(`Bearer ${fakeTokenValue}`);
      })();
    });
  });
});
