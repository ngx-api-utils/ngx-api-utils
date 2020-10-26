import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerAuthLayoutComponent} from './customer-auth-layout/customer-auth-layout.component';
import {CustomerSignInPageComponent} from './customer-sign-in-page/customer-sign-in-page.component';
import {CustomerSignUpPageComponent} from './customer-sign-up-page/customer-sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerAuthLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        component: CustomerSignInPageComponent
      },
      {
        path: 'sign-up',
        component: CustomerSignUpPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAuthRoutingModule {}
