import { TestBed, inject } from '@angular/core/testing';

import { ApiHttpErrorsService } from './api-http-errors.service';

describe('ApiHttpErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHttpErrorsService]
    });
  });

  it('should be created', inject([ApiHttpErrorsService], (service: ApiHttpErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
