import {TestBed, inject} from '@angular/core/testing';

import {JwtTokenDecoderService} from './jwt-token-decoder.service';

describe('JwtTokenDecoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtTokenDecoderService]
    });
  });

  it('should be created', inject([JwtTokenDecoderService], (service: JwtTokenDecoderService) => {
    expect(service).toBeTruthy();
  }));
});
