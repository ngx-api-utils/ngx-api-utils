import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import {ApiHttpHandlerService} from './api-http-handler.service';
import {AuthTokenService} from '../../auth-token/public-api';
import {API_HTTP_BASE_URL} from '../api-http-base-url';
import {API_HTTP_AUTHORIZATION_HEADER_NAME} from '../api-http-authorization-header-name';

describe('ApiHttpHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiHttpHandlerService,
        {
          provide: AuthTokenService,
          useValue: {}
        },
        {
          provide: API_HTTP_BASE_URL,
          useValue: '/api'
        },
        {
          provide: API_HTTP_AUTHORIZATION_HEADER_NAME,
          useValue: 'authorization'
        }
      ]
    });
  });

  it('should be created', inject([ApiHttpHandlerService], (service: ApiHttpHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
