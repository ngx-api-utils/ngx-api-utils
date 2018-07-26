import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { AUTH_TOKEN_NAME, AUTH_TOKEN_AUTO_REMOVE } from './auth-token/public_api';
import {
  API_HTTP_BASE_URL,
  API_HTTP_DEFAULT_HEADERS,
  API_HTTP_AUTHORIZATION_HEADER_NAME,
  API_HTTP_AUTHORIZATION_HEADER_TOKEN_TYPE_PREFIX,
  API_HTTP_INTERCEPTORS_INJECTION_TOKEN,
  API_HTTP_INTERCEPTORS,
  ApiBaseUrlInterceptor,
  ApiDefaultHeadersInterceptor,
  ApiAuthorizationHeaderInterceptor
} from './api-http/public_api';
import {
  API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATED,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATION
} from './api-auth-guard/public_api';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  exports: []
})
export class NgxApiUtilsModule {
  static forRoot(
    config?: {
      baseUrl?: string,
      authTokenName?: string,
      authTokenAutoRemove?: boolean,
      defaultHeaders?: HttpHeaders | string | { [name: string]: string | string[]; },
      authorizationHeaderName?: string,
      authorizationHeaderTokenTypePrefix?: string,
      interceptorsInjectionToken?: InjectionToken<InjectionToken<HttpInterceptor[]>>,
      authGuardPublicOnlyRoutes?: RegExp,
      authGuardUrlForAuthenticated?: string,
      authGuardUrlForAuthentication?: string
    }
  ): ModuleWithProviders {
    config = config || {};
    config = {
      ...config
    };
    const providers = [];
    if ('authTokenName' in config) {
      providers.push({
        provide: AUTH_TOKEN_NAME,
        useValue: config.authTokenName
      });
    }
    if ('authTokenAutoRemove' in config) {
      providers.push({
        provide: AUTH_TOKEN_AUTO_REMOVE,
        useValue: config.authTokenAutoRemove
      });
    }
    if ('baseUrl' in config) {
      providers.push({
        provide: API_HTTP_BASE_URL,
        useValue: config.baseUrl
      });
    }
    if ('defaultHeaders' in config) {
      providers.push({
        provide: API_HTTP_DEFAULT_HEADERS,
        useValue: config.defaultHeaders
      });
    }
    if ('authorizationHeaderName' in config) {
      providers.push({
        provide: API_HTTP_AUTHORIZATION_HEADER_NAME,
        useValue: config.authorizationHeaderName
      });
    }
    if ('authorizationHeaderTokenTypePrefix' in config) {
      providers.push({
        provide: API_HTTP_AUTHORIZATION_HEADER_TOKEN_TYPE_PREFIX,
        useValue: config.authorizationHeaderTokenTypePrefix
      });
    }
    if ('interceptorsInjectionToken' in config) {
      providers.push({
        provide: API_HTTP_INTERCEPTORS_INJECTION_TOKEN,
        useValue: config.interceptorsInjectionToken
      });
    }
    if ('authGuardPublicOnlyRoutes' in config) {
      providers.push({
        provide: API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
        useValue: config.authGuardPublicOnlyRoutes
      });
    }
    if ('authGuardUrlForAuthenticated' in config) {
      providers.push({
        provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATED,
        useValue: config.authGuardUrlForAuthenticated
      });
    }
    if ('authGuardUrlForAuthentication' in config) {
      providers.push({
        provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATION,
        useValue: config.authGuardUrlForAuthentication
      });
    }
    return {
      ngModule: NgxApiUtilsModule,
      providers: [
        {
          provide: API_HTTP_INTERCEPTORS, useExisting: ApiBaseUrlInterceptor, multi: true
        },
        {
          provide: API_HTTP_INTERCEPTORS, useExisting: ApiDefaultHeadersInterceptor, multi: true
        },
        {
          provide: API_HTTP_INTERCEPTORS, useExisting: ApiAuthorizationHeaderInterceptor, multi: true
        },
        ...providers
      ]
    };
  }
}
