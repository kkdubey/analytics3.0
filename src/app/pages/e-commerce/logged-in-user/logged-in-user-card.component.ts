import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { MetricsGraphViewService } from '../../../@core/data/metricsgraphview.service';

@Component({
  selector: 'logged-in-user-card',
  styleUrls: ['./logged-in-user-card.component.scss'],
  templateUrl: './logged-in-user-card.component.html',
})
export class LoggedinUserCardComponent implements OnDestroy {

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
    this.metricsGraphViewService.getLiveUser().subscribe(res => {debugger;
      this.loggedinUserData = JSON.parse(res['child']);
      this.loggedinUseBarData.data = this.loggedinUserData.chart;
      this.loggedinUseBarData.labels = xdata;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
