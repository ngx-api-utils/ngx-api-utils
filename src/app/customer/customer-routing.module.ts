import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerLayoutComponent} from './customer-layout/customer-layout.component';
import {ApiAuthGuardService} from 'ngx-api-utils';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './customer-auth/customer-auth.module#CustomerAuthModule',
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService]
  },
  {
    path: '',
    component: CustomerLayoutComponent,
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: './customer-dashboard/customer-dashboard.module#CustomerDashboardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
