import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  template: `
    <home-layout>
      <router-outlet></router-outlet>
    </home-layout>
  `,
})
export class HomeComponent {

}
