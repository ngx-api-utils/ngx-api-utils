import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminAuthRoutingModule} from './admin-auth-routing.module';
import {AdminAuthLayoutComponent} from './admin-auth-layout/admin-auth-layout.component';
import {AdminSignInPageComponent} from './admin-sign-in-page/admin-sign-in-page.component';

@NgModule({
  imports: [CommonModule, AdminAuthRoutingModule],
  declarations: [AdminAuthLayoutComponent, AdminSignInPageComponent]
})
export class AdminAuthModule {}
