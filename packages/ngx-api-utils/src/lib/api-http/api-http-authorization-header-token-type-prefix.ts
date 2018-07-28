import {InjectionToken} from '@angular/core';

export const API_HTTP_AUTHORIZATION_HEADER_TOKEN_TYPE_PREFIX = new InjectionToken<string>(
  'API_HTTP_AUTHORIZATION_HEADER_TOKEN_TYPE_PREFIX',
  {
    factory: () => 'Bearer '
  }
);
