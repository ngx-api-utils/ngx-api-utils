import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

const routes: Routes = [
  {
    path: '', component: CustomerLayoutComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'dashboard'
      },
      {
        path: 'dashboard', loadChildren: './customer-dashboard/customer-dashboard.module#CustomerDashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
