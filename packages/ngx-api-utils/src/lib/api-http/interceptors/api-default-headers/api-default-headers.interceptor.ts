import {Injectable, Optional, Inject} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiHttpDefaultHeadersStruct, API_HTTP_DEFAULT_HEADERS} from '../../api-http-default-headers';

@Injectable({
  providedIn: 'root'
})
export class ApiDefaultHeadersInterceptor implements HttpInterceptor {
  defaultHeaders: HttpHeaders;

  constructor(
    @Optional()
    @Inject(API_HTTP_DEFAULT_HEADERS)
    apiHttpDefaultHeaders?: ApiHttpDefaultHeadersStruct
  ) {
    if (!(apiHttpDefaultHeaders instanceof HttpHeaders)) {
      apiHttpDefaultHeaders = new HttpHeaders(apiHttpDefaultHeaders);
    }
    this.defaultHeaders = apiHttpDefaultHeaders;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.reqWithDefaultHeaders(req);
    return next.handle(req);
  }

  private reqWithDefaultHeaders(req: HttpRequest<any>) {
    const headers = Array.from(this.defaultHeaders.keys()).reduce((prevHeaders, headerName) => {
      // override only if not defined already
      if (!prevHeaders.has(headerName)) {
        prevHeaders = prevHeaders.set(headerName, this.defaultHeaders.get(headerName));
      }
      return prevHeaders;
    }, req.headers);
    return req.clone({
      headers
    });
  }
}
