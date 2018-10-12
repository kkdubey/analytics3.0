import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
  providers: [NgbTabsetConfig]
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;

  buyInChartData ={
    chartLabel: [],
    linesData:[]
  };
  buyinData = {
    currentValue: { },
  };
  activeUserChartData ={
    chartLabel: [],
    linesData:[]
  };
  activeUserData = {
    currentValue: { },
  };
  registrationChartData ={
    chartLabel: [],
    linesData:[]
  };
  registrationData = {
    currentValue: { },
  };

  constructor(
    tabsetConfig: NgbTabsetConfig,
    private metricsGraphViewService: MetricsGraphViewService) {
      tabsetConfig.justify = 'fill';
      // tabsetConfig.type = 'pills';

    let startDate = moment().subtract(6, 'days').format('YYYY-MM-DD');
    let endDate = moment().format('YYYY-MM-DD');

    this.getActiveUserChartData(startDate, endDate);
    this.getRegistrationChartData(startDate, endDate);
    this.getBuyinChartData(startDate, endDate);
  }

  setPeriodAndGetChartData(value: any): void {
    let startDate = value.start.format('YYYY-MM-DD');
    let endDate = value.end.format('YYYY-MM-DD');
    this.getActiveUserChartData(startDate, endDate);
    this.getRegistrationChartData(startDate, endDate);
    this.getBuyinChartData(startDate, endDate);
  }

  getBuyinChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getBuyin(startDate, endDate).subscribe(res => {
      this.buyinData = JSON.parse(res['child']);
      this.buyInChartData = this.getBuyinData(this.buyinData);
    });
  }

  getActiveUserChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getActiveUser(startDate, endDate).subscribe(res => {
      this.activeUserData = JSON.parse(res['child']);
      this.activeUserChartData = this.getActiveUserData(this.activeUserData);
    });
  }

  getRegistrationChartData(startDate: string, endDate: string) {
    this.metricsGraphViewService.getUserRegistration(startDate, endDate).subscribe(res => {
      this.registrationData = JSON.parse(res['child']);
      this.registrationChartData = this.getRegistrationData(this.registrationData);
    });
  }

  private getBuyinData(res) {
    let chartData = {
      chartLabel: [],
      linesData:[]
    }
    chartData.linesData.push(res.currentValue.ordinates.map(a => parseInt(a.y)));
    chartData.linesData.push(res.currentValue.ordinates.map(a => (parseInt(a.y)+5000)));
    chartData.chartLabel = res.currentValue.ordinates.map(a => a.x.day);
    return chartData;
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

  private getRegistrationData(res) {
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
