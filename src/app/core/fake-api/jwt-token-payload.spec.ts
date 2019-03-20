import {ComponentFixture} from '@angular/core/testing';
import {JwtTokenPayload} from './jwt-token-payload';

describe('JwtTokenPayload', () => {
  var payload: Partial<JwtTokenPayload>;

  it('should create an instance', () => {
    payload = {
      email: 'bruno@email.com',
      exp: 1552911396,
      iat: 1552907796,
      mathRandom: 0.11376660349087908
    };
    var result = new JwtTokenPayload(payload);
    expect(result).toBeTruthy();
  });
});
