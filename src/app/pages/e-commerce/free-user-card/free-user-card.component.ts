import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { OrdersProfitChartService } from '../../../@core/data/orders-profit-chart.service';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'free-user-card',
  styleUrls: ['./free-user-card.component.scss'],
  templateUrl: './free-user-card.component.html',
  providers: [NgbTabsetConfig]
})
export class FreeUserCardComponent implements OnDestroy {

  private alive = true;

  period: string = 'week';

  paidChartData ={
    chartLabel: [],
    linesData:[]
  };
  PaidData = {
    currentValue: { },
  };

  constructor(private ordersProfitChartService: OrdersProfitChartService
    ,tabsetConfig: NgbTabsetConfig
    ,private metricsGraphViewService: MetricsGraphViewService) {
      tabsetConfig.justify = 'fill';
      // tabsetConfig.type = 'pills';

    let startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');
    this.getActiveUserChartData(startDate, endDate);
  }

  setPeriodAndGetChartData(value: any): void {
    let startDate = value.start.format('YYYY-MM-DD');
    let endDate = value.end.format('YYYY-MM-DD');
    this.getActiveUserChartData(startDate, endDate);
  }


  getActiveUserChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getFreeBuyingCount(startDate, endDate).subscribe(res => {
      this.PaidData = JSON.parse(res['child']);
      this.paidChartData = this.getActiveUserData(this.PaidData);
    });
  }

  private getActiveUserData(res) {
    let chartData = {
      chartLabel: [],
      linesData:[]
    }
    chartData.linesData.push(res.currentValue.ordinates.map(a => parseInt(a.y)));
    chartData.linesData.push(res.currentValue.ordinates.map(a => (parseInt(a.y)+5000)));
    chartData.chartLabel = res.currentValue.ordinates.map(a => a.x.day);
    return chartData;
  }


  ngOnDestroy() {
    this.alive = false;
  }
}
