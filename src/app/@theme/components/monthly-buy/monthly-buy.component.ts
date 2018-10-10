import { Component } from '@angular/core';

@Component({
  selector: 'monthly-buy',
  styleUrls: ['./monthly-buy.component.scss'],
  templateUrl: './monthly-buy.component.html',
})
export class MonthlyBuyComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
