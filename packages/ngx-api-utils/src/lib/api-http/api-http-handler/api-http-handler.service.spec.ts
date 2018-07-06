import { TestBed, inject } from '@angular/core/testing';

import { ApiHttpHandlerService } from './api-http-handler.service';

describe('ApiHttpHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHttpHandlerService]
    });
  });

  it('should be created', inject([ApiHttpHandlerService], (service: ApiHttpHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
