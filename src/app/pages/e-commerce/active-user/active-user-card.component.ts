import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'active-user-card',
  styleUrls: ['./active-user-card.component.scss'],
  templateUrl: './active-user-card.component.html',
})
export class ActiveUserCardComponent implements OnDestroy {

  private alive = true;

  loggedinUseBarData: any = {
    data: [],
    labels: [],
    formatter: '{c0} User'
  };
  loggedinUserData = {
    Total:'',
    chart: [],
  };

  currentTheme: string;

  constructor(private themeService: NbThemeService,
    private metricsGraphViewService: MetricsGraphViewService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
    let xdata = [];
    for(var i=30;i>=1;i--){
      xdata.push(i+' Min');
    }
    this.metricsGraphViewService.getLiveActiveUser().subscribe(res => {
      this.loggedinUserData = JSON.parse(res['child']);
      this.loggedinUseBarData.data = this.loggedinUserData.chart;
      this.loggedinUseBarData.labels = xdata;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
