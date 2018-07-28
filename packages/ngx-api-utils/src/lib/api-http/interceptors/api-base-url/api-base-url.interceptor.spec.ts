import {TestBed, inject} from '@angular/core/testing';

import {ApiBaseUrlInterceptor} from './api-base-url.interceptor';
import {API_HTTP_BASE_URL} from '../../api-http-base-url';

describe('ApiBaseUrlInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiBaseUrlInterceptor,
        {
          provide: API_HTTP_BASE_URL,
          useValue: '/api'
        }
      ]
    });
  });

  it('should be created', inject([ApiBaseUrlInterceptor], (service: ApiBaseUrlInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
