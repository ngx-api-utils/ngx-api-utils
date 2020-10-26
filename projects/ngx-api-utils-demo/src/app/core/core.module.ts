import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {
  TokenDecoder,
  NgxApiUtilsModule,
  API_HTTP_BASE_URL,
  API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATION,
  API_AUTH_GUARD_URL_FOR_AUTHENTICATED
} from 'ngx-api-utils';
import {JwtTokenDecoderService} from './fake-api/jwt-token-decoder/jwt-token-decoder.service';

export const publicOnlyRoutesRegexp = /^\/(customer\/auth)([\/#?].*)?$/;

@NgModule({
  imports: [CommonModule, NgxApiUtilsModule],
  declarations: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: API_HTTP_BASE_URL,
          useValue: '//localhost:3000'
        },
        {
          provide: API_AUTH_GUARD_PUBLIC_ONLY_ROUTES,
          useValue: publicOnlyRoutesRegexp
        },
        {
          provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATED,
          useValue: '/customer/'
        },
        {
          provide: API_AUTH_GUARD_URL_FOR_AUTHENTICATION,
          useValue: '/customer/'
        },
        {
          provide: TokenDecoder,
          useClass: JwtTokenDecoderService
        }
      ]
    };
  }
}
