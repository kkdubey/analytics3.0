// Third-party imports go here
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MetricsGraphViewService {
  baseUrl: string = "http://54.144.59.253:8080/ab/";
  constructor(private http: HttpClient) {}

  getActiveUser(startDate: string, endDate: string, durationDays: string = '', metrics: string = 'ubuying_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('durationDays', durationDays);
    queryParams.set('metrics', metrics);
    return this.getMetricsByParam(queryParams);
  }

  getBuyin(startDate: string, endDate: string, durationDays: string = '', metrics: string = 'buyin') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('durationDays', durationDays);
    queryParams.set('metrics', metrics);
    return this.getMetricsByParam(queryParams);
  }

  getUserRegistration(startDate: string, endDate: string, durationDays: string = '', metrics: string = 'uregistration_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('durationDays', durationDays);
    queryParams.set('metrics', metrics);
    return this.getMetricsByParam(queryParams);
  }

  getPaidBuyingCount(startDate: string, endDate: string, durationDays: string = '', metrics: string = 'paid_buying_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('durationDays', durationDays);
    queryParams.set('metrics', metrics);
    return this.getMetricsByParam(queryParams);
  }

  getFreeBuyingCount(startDate: string, endDate: string, durationDays: string = '', metrics: string = 'free_buying_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    queryParams.set('durationDays', durationDays);
    queryParams.set('metrics', metrics);
    return this.getMetricsByParam(queryParams);
  }

  getTop10User(startDate: string, endDate: String) {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    let url = this.baseUrl + 'tableview/top10users?';
    return this.getTableViewByParam(queryParams, url);
  }

  getMapData(startDate: string, endDate: string) {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('startDate', startDate);
    queryParams.set('endDate', endDate);
    let url = this.baseUrl + 'tableview/state?';
    return this.getTableViewByParam(queryParams, url);
  }

  getLiveUser(dimension: string = 'uvisitor_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('aDimension', dimension);
    let url = this.baseUrl + 'liveview/?';
    return this.getTableViewByParam(queryParams, url);
  }

  getLiveActiveUser(dimension: string = 'ugame_visitor_count') {
    let queryParams = new Map<string, any>();
    queryParams.set('accountId', 'STARPICK');
    queryParams.set('aDimension', dimension);
    let url = this.baseUrl + 'liveview/?';
    return this.getTableViewByParam(queryParams, url);
  }

  private getMetricsByParam(queryParams: Map<string, any> = null) {
    let metricsURL = this.baseUrl + 'metricsgraphview/?';
    queryParams.forEach((value: any, key: string) => {
      metricsURL = metricsURL + key + '=' + value + '&';
    });
    metricsURL = metricsURL.slice(0, metricsURL.length - 1);
    return this.http.get(metricsURL);
  }

  private getTableViewByParam(queryParams: Map<string, any> = null, url: string) {
    let metricsURL = url;
    queryParams.forEach((value: any, key: string) => {
      metricsURL = metricsURL + key + '=' + value + '&';
    });
    metricsURL = metricsURL.slice(0, metricsURL.length - 1);
    return this.http.get(metricsURL);
  }

  private getLiveViewByParam(queryParams: Map<string, any> = null, url: string) {
    let metricsURL = url;
    queryParams.forEach((value: any, key: string) => {
      metricsURL = metricsURL + key + '=' + value + '&';
    });
    metricsURL = metricsURL.slice(0, metricsURL.length - 1);
    return this.http.get(metricsURL);
  }
}
