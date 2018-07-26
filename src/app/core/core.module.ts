import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TokenDecoder, NgxApiUtilsModule } from 'ngx-api-utils';
import { JwtTokenDecoderService } from './fake-api/jwt-token-decoder/jwt-token-decoder.service';

@NgModule({
  imports: [
    CommonModule,
    NgxApiUtilsModule
  ],
  declarations: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: TokenDecoder,
          useClass: JwtTokenDecoderService
        }
      ]
    };
  }
}
