import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PublicLayoutComponent} from './public-layout/public-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PricingPageComponent} from './pricing-page/pricing-page.component';
import {FeaturesPageComponent} from './features-page/features-page.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'pricing',
        component: PricingPageComponent
      },
      {
        path: 'features',
        component: FeaturesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
