import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminDashboardRoutingModule} from './admin-dashboard-routing.module';
import {AdminDashboardPageComponent} from './admin-dashboard-page/admin-dashboard-page.component';

@NgModule({
  imports: [CommonModule, AdminDashboardRoutingModule],
  declarations: [AdminDashboardPageComponent]
})
export class AdminDashboardModule {}
