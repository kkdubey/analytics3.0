import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomLoginPageComponent } from './login-page/custom-login-page.component';
import { from } from 'rxjs';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
    path: 'page',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: CustomLoginPageComponent,
  },
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full',
  }, {
    path: '**',
    component: HomeComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
