import {InjectionToken} from '@angular/core';

export const AUTH_TOKEN_NAME = new InjectionToken<string>('AUTH_TOKEN_NAME', {
  providedIn: 'root',
  factory: () => 'id_token'
});
