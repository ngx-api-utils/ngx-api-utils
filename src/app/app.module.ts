import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxApiUtilsModule } from 'ngx-api-utils';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxApiUtilsModule.forRoot({
      baseUrl: '//localhost:3000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
