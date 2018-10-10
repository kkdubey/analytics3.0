import { Component } from '@angular/core';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'user-statics',
  styleUrls: ['./user-statics.component.scss'],
  templateUrl: './user-statics.component.html',
})
export class UserStaticsComponent {
  constructor(private metricsGraphViewService: MetricsGraphViewService) {
    // this.metricsGraphViewService.getActiveUser("2018-09-18","2018-09-10","","buyin").subscribe(res => {debugger;
    //   console.log(res);
    // });
  }
 }
