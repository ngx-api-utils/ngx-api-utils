import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminAuthLayoutComponent} from './admin-auth-layout/admin-auth-layout.component';
import {AdminSignInPageComponent} from './admin-sign-in-page/admin-sign-in-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAuthLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        component: AdminSignInPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule {}
