import {InjectionToken} from '@angular/core';

export const API_HTTP_AUTHORIZATION_HEADER_NAME = new InjectionToken<string>('API_HTTP_AUTHORIZATION_HEADER_NAME', {
  factory: () => 'Authorization'
});
