import {InjectionToken} from '@angular/core';

export const API_HTTP_BASE_URL = new InjectionToken<string>('API_HTTP_BASE_URL', {
  providedIn: 'root',
  factory: () => '/api'
});
