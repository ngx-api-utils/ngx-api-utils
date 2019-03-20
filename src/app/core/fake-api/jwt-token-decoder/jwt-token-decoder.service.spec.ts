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

  it('decode function should work as expected', inject([JwtTokenDecoderService], (service: JwtTokenDecoderService) => {
    const sampleString1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vQGVtYWlsLmNvbSIsIm1hdGhSYW5kb2';
    const sampleString2 =
      '0iOjAuMTEzNzY2NjAzNDkwODc5MDgsImlhdCI6MTU1MjkwNzc5NiwiZXhwIjoxNTUyOTExMzk2fQ.-IlshCPYEj5CpQmoxlmN9M5IRtXwAWxcllxei54K8TU';
    const sampleString = sampleString1 + sampleString2;
    const actual = JSON.stringify(service.decode(sampleString));
    const expected = '{"email":"bruno@email.com","mathRandom":0.11376660349087908,"iat":1552907796,"exp":1552911396}';
    expect(actual).toEqual(expected);
  }));
});
