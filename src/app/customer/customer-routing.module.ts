import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerHomeComponent} from './customer-home/customer-home.component';
import {CustomerLoginComponent} from './customer-login/customer-login.component';
import {CustomerNoPermissionComponent} from './customer-no-permission/customer-no-permission.component';
import {CustomerInsideComponent} from './customer-inside/customer-inside.component';
import {ApiAuthGuardService} from 'ngx-api-utils';

const routes: Routes = [
  {
    path: 'login',
    component: CustomerLoginComponent
  },
  {
    path: 'home',
    canActivate: [ApiAuthGuardService],
    canActivateChild: [ApiAuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CustomerHomeComponent
      },
      {
        path: 'inside',
        pathMatch: 'full',
        component: CustomerInsideComponent
      }
    ]
  },
  {
    path: 'no-permission',
    component: CustomerNoPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
