import {TestBed, inject} from '@angular/core/testing';

import {TokenDecoder} from './token-decoder';
import {TokenPayload} from '../token-payload/token-payload';

describe('TokenDecoder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenDecoder]
    });
  });

  it('should be created', inject([TokenDecoder], (service: TokenDecoder) => {
    expect(service).toBeTruthy();
  }));

  it('should decode a token', inject([TokenDecoder], (service: TokenDecoder) => {
    const tokenPayload = service.decode('fake token');
    expect(tokenPayload).toBeTruthy();
    expect(tokenPayload instanceof TokenPayload).toBeTruthy();
  }));
});
