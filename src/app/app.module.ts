import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppNavigationComponent} from './navigation/app-navigation.component';

@NgModule({
  declarations: [AppComponent, AppNavigationComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
