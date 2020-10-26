import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule],
  declarations: [MainLayoutComponent, NotFoundPageComponent]
})
export class MainModule {}
