import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerAuthRoutingModule} from './customer-auth-routing.module';
import {CustomerAuthLayoutComponent} from './customer-auth-layout/customer-auth-layout.component';
import {CustomerSignInPageComponent} from './customer-sign-in-page/customer-sign-in-page.component';
import {CustomerSignUpPageComponent} from './customer-sign-up-page/customer-sign-up-page.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, CustomerAuthRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CustomerAuthLayoutComponent, CustomerSignInPageComponent, CustomerSignUpPageComponent]
})
export class CustomerAuthModule {}
