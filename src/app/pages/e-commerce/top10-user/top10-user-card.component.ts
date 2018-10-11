import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import * as moment from 'moment';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'top10-user-card',
  styleUrls: ['./top10-user-card.component.scss'],
  templateUrl: './top10-user-card.component.html',
})
export class Top10UserCardComponent implements OnDestroy {

  private alive = true;


  currentTheme: string;
  top10UserData:any = {};

  constructor(private themeService: NbThemeService
    ,private metricsGraphViewService: MetricsGraphViewService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });

    let startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');
    this.getTop10UserChartData(startDate, endDate);
  }

  trackByDate(_, item) {
    return item.date;
  }

  setPeriodAndGetChartData(value: any): void {
    let startDate = value.start.format('YYYY-MM-DD');
    let endDate = value.end.format('YYYY-MM-DD');
    this.getTop10UserChartData(startDate, endDate);
  }

  getTop10UserChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getTop10User(startDate, endDate).subscribe(res => {
      this.top10UserData = JSON.parse(res['child']);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
