import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerDashboardRoutingModule} from './customer-dashboard-routing.module';
import {CustomerDashboardPageComponent} from './customer-dashboard-page/customer-dashboard-page.component';

@NgModule({
  imports: [CommonModule, CustomerDashboardRoutingModule],
  declarations: [CustomerDashboardPageComponent]
})
export class CustomerDashboardModule {}
