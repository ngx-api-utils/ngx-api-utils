import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminHeaderComponent} from './admin-layout/admin-header/admin-header.component';
import {AdminFooterComponent} from './admin-layout/admin-footer/admin-footer.component';
import {AdminNavigationComponent} from './admin-layout/admin-navigation/admin-navigation.component';
import {AdminSidebarComponent} from './admin-layout/admin-sidebar/admin-sidebar.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminLayoutComponent, AdminHeaderComponent, AdminFooterComponent, AdminNavigationComponent, AdminSidebarComponent]
})
export class AdminModule {}
