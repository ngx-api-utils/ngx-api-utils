import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'customer/auth/sign-in'
  },
  {
    path: 'admin-login',
    redirectTo: 'admin/auth/sign-in'
  },
  {
    path: 'customer',
    // loadChildren: './customer/customer.module#CustomerModule'
    loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
  },
  {
    path: 'admin',
    // loadChildren: './admin/admin.module#AdminModule'
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '',
    // loadChildren: './public/public.module#PublicModule'
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
  },
  {
    path: '',
    // loadChildren: './main/main.module#MainModule'
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
