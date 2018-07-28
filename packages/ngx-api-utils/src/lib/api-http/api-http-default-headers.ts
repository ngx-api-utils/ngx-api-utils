import {InjectionToken} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

export type ApiHttpDefaultHeadersStruct = HttpHeaders | string | {[name: string]: string | string[]};

export const API_HTTP_DEFAULT_HEADERS = new InjectionToken<ApiHttpDefaultHeadersStruct>('API_HTTP_DEFAULT_HEADERS', {
  providedIn: 'root',
  factory: () => ({
    accept: 'application/json, */*'
  })
});
