import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body' | any;
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | any;
  withCredentials?: boolean;
  body?: any;
}
