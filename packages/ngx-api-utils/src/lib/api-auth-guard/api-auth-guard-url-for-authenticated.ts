import {InjectionToken} from '@angular/core';

export const API_AUTH_GUARD_URL_FOR_AUTHENTICATED = new InjectionToken<string>('API_AUTH_GUARD_URL_FOR_AUTHENTICATED', {
  providedIn: 'root',
  factory: () => '/'
});
