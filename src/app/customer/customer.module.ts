import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerHomeComponent} from './customer-home/customer-home.component';
import {CustomerLoginComponent} from './customer-login/customer-login.component';
import {CustomerNoPermissionComponent} from './customer-no-permission/customer-no-permission.component';
import {CustomerInsideComponent} from './customer-inside/customer-inside.component';

@NgModule({
  imports: [CommonModule, CustomerRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CustomerHomeComponent, CustomerLoginComponent, CustomerNoPermissionComponent, CustomerInsideComponent]
})
export class CustomerModule {}
