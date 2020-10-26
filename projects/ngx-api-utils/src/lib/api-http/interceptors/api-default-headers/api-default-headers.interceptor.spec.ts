import {TestBed, inject} from '@angular/core/testing';

import {ApiDefaultHeadersInterceptor} from './api-default-headers.interceptor';

describe('ApiDefaultHeadersInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDefaultHeadersInterceptor]
    });
  });

  it('should be created', inject([ApiDefaultHeadersInterceptor], (service: ApiDefaultHeadersInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
