import {TestBed, inject} from '@angular/core/testing';

import {ApiAuthorizationHeaderInterceptor} from './api-authorization-header.interceptor';
import {API_HTTP_AUTHORIZATION_HEADER_NAME} from '../../api-http-authorization-header-name';
import {AuthTokenService} from '../../../auth-token/public-api';

describe('ApiAuthorizationHeaderInterceptor', () => {
  beforeEach(() => {
    const fakeAuthTokenService = jasmine.createSpyObj<AuthTokenService>('fakeAuthTokenService', ['isValid']);
    fakeAuthTokenService.isValid.and.callFake(() => true);
    (fakeAuthTokenService as any).value = 'fake token';
    TestBed.configureTestingModule({
      providers: [
        ApiAuthorizationHeaderInterceptor,
        {
          provide: API_HTTP_AUTHORIZATION_HEADER_NAME,
          useValue: 'Authorization'
        },
        {
          provide: AuthTokenService,
          useValue: fakeAuthTokenService
        }
      ]
    });
  });

  it('should be created', inject([ApiAuthorizationHeaderInterceptor], (service: ApiAuthorizationHeaderInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
