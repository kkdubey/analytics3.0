import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';


@Component({
  selector: 'custom-daterangepicker',
  styleUrls: ['./daterangepicker.component.scss'],
  templateUrl: './daterangepicker.component.html',
})
export class CustomDateRangePickerComponent implements OnDestroy {

  private alive = true;

  @Output() periodChange = new EventEmitter<string>();

  @Input() selectedPeriod: string = 'week';

  public daterange: any = {
    start: Date.now(),
    end: Date.now(),
    label: ''
  };


  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    open:'left',
    ranges: {
      'Today': [Date.now(), Date.now()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
   }
  }

  types: string[] = ['week', 'month', 'year', 'custom'];

  constructor() {  }

  public selectedDate(value: any) {
    console.log(value);
    this.daterange.start = value.start;
    this.daterange.end = value.end;
  }

  public applyDate(e: any) {
    this.daterange.start = e.picker.startDate;
    this.daterange.end = e.picker.endDate;
    this.changePeriod();

  }

  ngAfterViewInit() {
    //this.picker.datePicker.setStartDate('2007-03-27');
  }

  changePeriod(): void {
    this.periodChange.emit(this.daterange);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
