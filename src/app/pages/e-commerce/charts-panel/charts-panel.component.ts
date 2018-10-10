import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { OrdersChartComponent } from './charts/orders-chart.component';
import { ProfitChartComponent } from './charts/profit-chart.component';
import { OrdersChart } from '../../../@core/data/orders-chart.service';
import { ProfitChart } from '../../../@core/data/profit-chart.service';
import { OrdersProfitChartService, OrderProfitChartSummary } from '../../../@core/data/orders-profit-chart.service';

import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'ngx-ecommerce-charts',
  styleUrls: ['./charts-panel.component.scss'],
  templateUrl: './charts-panel.component.html',
  providers: [NgbTabsetConfig]
})
export class ECommerceChartsPanelComponent implements OnDestroy {

  private alive = true;

  chartPanelSummary: OrderProfitChartSummary[];
  period: string = 'week';
  ordersChartData: OrdersChart;
  profitChartData: ProfitChart;
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

  @ViewChild('ordersChart') ordersChart: OrdersChartComponent;
  @ViewChild('profitChart') profitChart: ProfitChartComponent;

  constructor(private ordersProfitChartService: OrdersProfitChartService
    ,tabsetConfig: NgbTabsetConfig
    ,private metricsGraphViewService: MetricsGraphViewService) {
      tabsetConfig.justify = 'fill';
      // tabsetConfig.type = 'pills';
    this.ordersProfitChartService.getOrderProfitChartSummary()
      .pipe(takeWhile(() => this.alive))
      .subscribe((summary) => {
        this.chartPanelSummary = summary;
      });

    this.getOrdersChartData(this.period);
    this.getProfitChartData(this.period);
    this.getActiveUserChartData("2018-09-10","2018-09-18");
    this.getRegistrationChartData("2018-09-10","2018-09-18");
    this.getBuyinChartData("2018-09-10","2018-09-18");
  }

  setPeriodAndGetChartData(value: any): void {debugger;
    let startDate = value.start.format('YYYY-MM-DD');
    let endDate = value.end.format('YYYY-MM-DD');
    this.getActiveUserChartData(startDate, endDate);
    this.getRegistrationChartData(startDate, endDate);
    this.getBuyinChartData(startDate, endDate);
  }

  changeTab(selectedTab) {
    if (selectedTab.tabTitle === 'Profit') {
      this.profitChart.resizeChart();
    } else {
      this.ordersChart.resizeChart();
    }
  }

  getOrdersChartData(period: string) {
    this.ordersProfitChartService.getOrdersChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(ordersChartData => {
        this.ordersChartData = ordersChartData;
      });
  }

  getProfitChartData(period: string) {
    this.ordersProfitChartService.getProfitChartData(period)
      .pipe(takeWhile(() => this.alive))
      .subscribe(profitChartData => {
        this.profitChartData = profitChartData;
      });
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
