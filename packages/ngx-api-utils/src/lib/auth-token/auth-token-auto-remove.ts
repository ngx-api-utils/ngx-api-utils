import {InjectionToken} from '@angular/core';

export const AUTH_TOKEN_AUTO_REMOVE = new InjectionToken<boolean>('AUTH_TOKEN_AUTO_REMOVE', {
  providedIn: 'root',
  factory: () => true
});
