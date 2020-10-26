import {HttpHandler, HttpInterceptor, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InjectionToken} from '@angular/core';

/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 * @see https://github.com/angular/angular/blob/6.0.x/packages/common/http/src/interceptor.ts#L52
 */
export class HttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered for ApiHttp
 *
 *
 */
export const API_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('API_HTTP_INTERCEPTORS');

export const API_HTTP_INTERCEPTORS_INJECTION_TOKEN = new InjectionToken<InjectionToken<HttpInterceptor[]>>(
  'API_HTTP_INTERCEPTORS_INJECTION_TOKEN',
  {providedIn: 'root', factory: () => API_HTTP_INTERCEPTORS}
);
