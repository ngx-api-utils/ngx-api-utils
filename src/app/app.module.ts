import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxApiUtilsModule } from 'ngx-api-utils';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxApiUtilsModule.forRoot({
      baseUrl: '//localhost:3000',
      authTokenAutoRemove: true,
      authGuardPublicOnlyRoutes: /^\/(customer\/auth)([\/#?].*)?$/,
      authGuardUrlForAuthenticated: '/customer/',
      authGuardUrlForAuthentication: '/customer/auth/sign-in'
    }),
    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
