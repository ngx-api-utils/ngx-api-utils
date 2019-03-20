import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminDashboardComponent]
})
export class AdminModule {}
