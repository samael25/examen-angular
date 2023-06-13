import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { HttpRequestMethod } from './request-methods';
import { RequestOptions } from './request-options';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpApiService implements OnDestroy {
  private subscription$: Subscription = new Subscription();
  constructor(private http: HttpClient) {}

  httpApi<T>(
    method: HttpRequestMethod,
    endPoint: string,
    params: object = {},
    options: RequestOptions = {}
  ): Observable<T> {
    const url = `${environment.urlApi}${endPoint}`;
    return this.send<T>(
      method,
      url,
      params,
      this.requestOptions(method, params, options)
    );
  }
  private send<T>(
    method: string,
    url: string,
    params: object = {},
    options: RequestOptions = {}
  ): Observable<T> {
    const res = this.http
      .request<T>(method, url, this.requestOptions(method, params, options))
      .pipe(share());
    return res;
  }

  private requestOptions(
    method: string,
    params: any,
    options: RequestOptions
  ): RequestOptions {
    if (method === 'POST' || method === 'PUT') {
      options.body = params;
    } else {
      options.params = params;
    }

    return options;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
