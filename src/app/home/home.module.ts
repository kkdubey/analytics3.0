import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { HomePageComponent } from './home-page/home-page.component';

const PAGES_COMPONENTS = [
  HomeComponent,
  HomePageComponent
];

@NgModule({
  imports: [
    HomeRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class HomeModule {
}
