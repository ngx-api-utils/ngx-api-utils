import {InjectionToken} from '@angular/core';

export const API_AUTH_GUARD_URL_FOR_AUTHENTICATION = new InjectionToken<string>('API_AUTH_GUARD_URL_FOR_AUTHENTICATION', {
  providedIn: 'root',
  factory: () => '/login'
});
