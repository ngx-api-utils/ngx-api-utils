import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminDashboardPageComponent} from './admin-dashboard-page/admin-dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {}
