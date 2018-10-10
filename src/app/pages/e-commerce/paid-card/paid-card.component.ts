import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { OrdersProfitChartService } from '../../../@core/data/orders-profit-chart.service';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'paid-card',
  styleUrls: ['./paid-card.component.scss'],
  templateUrl: './paid-card.component.html',
  providers: [NgbTabsetConfig]
})
export class PaidCardComponent implements OnDestroy {

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

    this.getActiveUserChartData("2018-09-10","2018-09-18");
  }

  setPeriodAndGetChartData(value: any): void {debugger;
    let startDate = value.start.format('YYYY-MM-DD');
    let endDate = value.end.format('YYYY-MM-DD');
    this.getActiveUserChartData(startDate, endDate);
  }


  getActiveUserChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getPaidBuyingCount(startDate, endDate).subscribe(res => {
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
