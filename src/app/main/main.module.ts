import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainLayoutComponent} from './main-layout/main-layout.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule],
  declarations: [MainLayoutComponent]
})
export class MainModule {}
