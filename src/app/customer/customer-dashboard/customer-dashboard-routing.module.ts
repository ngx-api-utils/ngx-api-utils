import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerDashboardPageComponent} from './customer-dashboard-page/customer-dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule {}
