import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {PublicLayoutComponent} from './public-layout/public-layout.component';
import {PricingPageComponent} from './pricing-page/pricing-page.component';
import {FeaturesPageComponent} from './features-page/features-page.component';
import {PublicNavigationComponent} from './public-layout/public-navigation/public-navigation.component';
import {PublicFooterComponent} from './public-layout/public-footer/public-footer.component';
import {PublicHeaderComponent} from './public-layout/public-header/public-header.component';
import {HomePageComponent} from './home-page/home-page.component';

@NgModule({
  imports: [CommonModule, PublicRoutingModule],
  declarations: [
    PublicLayoutComponent,
    PricingPageComponent,
    FeaturesPageComponent,
    PublicNavigationComponent,
    PublicFooterComponent,
    PublicHeaderComponent,
    HomePageComponent
  ]
})
export class PublicModule {}
