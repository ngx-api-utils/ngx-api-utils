import {TestBed, inject} from '@angular/core/testing';

import {ApiErrorsInterceptor} from './api-errors.interceptor';

describe('ApiErrorsInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiErrorsInterceptor]
    });
  });

  it('should be created', inject([ApiErrorsInterceptor], (service: ApiErrorsInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
