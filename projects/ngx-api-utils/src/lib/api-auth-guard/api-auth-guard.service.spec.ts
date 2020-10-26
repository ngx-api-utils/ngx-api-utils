import {TestBed, inject} from '@angular/core/testing';

import {ApiAuthGuardService} from './api-auth-guard.service';

// TODO: Complete these unit tests and also provide integration tests in ngx-api-utils.spec.ts
xdescribe('ApiAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAuthGuardService]
    });
  });

  it('should be created', inject([ApiAuthGuardService], (service: ApiAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
