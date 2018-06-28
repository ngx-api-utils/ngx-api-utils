import { TestBed, inject } from '@angular/core/testing';

import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTokenService]
    });
  });

  it('should be created', inject([AuthTokenService], (service: AuthTokenService) => {
    expect(service).toBeTruthy();
  }));
});
