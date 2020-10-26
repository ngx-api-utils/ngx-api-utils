import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {
  API_HTTP_INTERCEPTORS,
  ApiBaseUrlInterceptor,
  ApiDefaultHeadersInterceptor,
  ApiAuthorizationHeaderInterceptor
} from './api-http/public-api';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: API_HTTP_INTERCEPTORS,
      useExisting: ApiBaseUrlInterceptor,
      multi: true
    },
    {
      provide: API_HTTP_INTERCEPTORS,
      useExisting: ApiDefaultHeadersInterceptor,
      multi: true
    },
    {
      provide: API_HTTP_INTERCEPTORS,
      useExisting: ApiAuthorizationHeaderInterceptor,
      multi: true
    }
  ]
})
export class NgxApiUtilsModule {}
