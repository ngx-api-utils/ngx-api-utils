import { TestBed, inject } from '@angular/core/testing';

import { NgxApiUtilsService } from './ngx-api-utils.service';

describe('NgxApiUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxApiUtilsService]
    });
  });

  it('should be created', inject([NgxApiUtilsService], (service: NgxApiUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
