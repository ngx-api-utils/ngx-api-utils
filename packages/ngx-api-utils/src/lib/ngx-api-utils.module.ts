import { NgModule, Optional, SkipSelf, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { AUTH_TOKEN_NAME, AUTH_TOKEN_AUTO_REMOVE } from './auth-token/public_api';
import {
  API_HTTP_BASE_URL,
  API_HTTP_DEFAULT_HEADERS,
  API_HTTP_AUTHORIZATION_HEADER_NAME,
  API_HTTP_INTERCEPTORS_INJECTION_TOKEN,
  API_HTTP_INTERCEPTORS,
  ApiBaseUrlInterceptor,
  ApiDefaultHeadersInterceptor,
  ApiAuthorizationHeaderInterceptor
} from './api-http/public_api';

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
      interceptorsInjectionToken?: InjectionToken<InjectionToken<HttpInterceptor[]>>
    }
  ): ModuleWithProviders {
    config = {
      baseUrl: '/api',
      defaultHeaders: {
        'accept': 'application/json, */*'
      },
      authorizationHeaderName: 'Authorization',
      ...config,
    };
    return {
      ngModule: NgxApiUtilsModule,
      providers: [
        {
          provide: AUTH_TOKEN_NAME,
          useValue: config.authTokenName
        },
        {
          provide: AUTH_TOKEN_AUTO_REMOVE,
          useValue: config.authTokenAutoRemove
        },
        {
          provide: API_HTTP_BASE_URL,
          useValue: config.baseUrl
        },
        {
          provide: API_HTTP_DEFAULT_HEADERS,
          useValue: config.defaultHeaders
        },
        {
          provide: API_HTTP_AUTHORIZATION_HEADER_NAME,
          useValue: config.authorizationHeaderName
        },
        {
          provide: API_HTTP_INTERCEPTORS_INJECTION_TOKEN,
          useValue: config.interceptorsInjectionToken || API_HTTP_INTERCEPTORS
        },
        {
          provide: API_HTTP_INTERCEPTORS, useClass: ApiBaseUrlInterceptor, multi: true
        },
        {
          provide: API_HTTP_INTERCEPTORS, useClass: ApiDefaultHeadersInterceptor, multi: true
        },
        {
          provide: API_HTTP_INTERCEPTORS, useClass: ApiAuthorizationHeaderInterceptor, multi: true
        }
      ]
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule?: NgxApiUtilsModule,
  ) {
    // throw in case someone wrongly imports this module twice
    if (parentModule) {
      throw new Error(
        'NgxApiUtilsModule is already loaded. Import it in the AppModule only');
    }
  }
}
