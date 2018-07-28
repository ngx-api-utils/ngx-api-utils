import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerLayoutComponent} from './customer-layout/customer-layout.component';
import {CustomerHeaderComponent} from './customer-layout/customer-header/customer-header.component';
import {CustomerFooterComponent} from './customer-layout/customer-footer/customer-footer.component';
import {CustomerNavigationComponent} from './customer-layout/customer-navigation/customer-navigation.component';

@NgModule({
  imports: [CommonModule, CustomerRoutingModule],
  declarations: [CustomerLayoutComponent, CustomerHeaderComponent, CustomerFooterComponent, CustomerNavigationComponent]
})
export class CustomerModule {}
