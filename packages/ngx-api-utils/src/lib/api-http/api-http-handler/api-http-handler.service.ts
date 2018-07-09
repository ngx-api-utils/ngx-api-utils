import { Injectable, Inject, Optional, Injector, InjectionToken } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthTokenService } from '../../auth-token/public_api';
import { API_HTTP_AUTHORIZATION_HEADER_NAME } from '../api-http-authorization-header-name';
import { API_HTTP_DEFAULT_HEADERS, ApiHttpDefaultHeadersStruct } from '../api-http-default-headers';
import { ApiHttpErrorsService } from '../api-http-errors/api-http-errors.service';
import { HttpInterceptorHandler, API_HTTP_INTERCEPTORS, API_HTTP_INTERCEPTORS_INJECTION_TOKEN } from '../interceptors';

/**
 * @deprecated This should become a flexible handler requiring interceptors from API_HTTP_INTERCEPTORS providers or so
 */
@Injectable({
  providedIn: 'root'
})
export class ApiHttpHandlerService implements HttpHandler {

  private defaultHeaders: HttpHeaders;
  private chain: HttpHandler|null = null;

  constructor(
    private backend: HttpHandler,
    private injector: Injector,
    @Inject(API_HTTP_INTERCEPTORS_INJECTION_TOKEN)
    private apiHttpInterceptorsInjectionToken: InjectionToken<HttpInterceptor[]>,
    private authTokenService: AuthTokenService,
    private apiHttpErrorsService: ApiHttpErrorsService,
    @Inject(API_HTTP_AUTHORIZATION_HEADER_NAME) private apiHttpAuthorizationHeaderName: string,
    @Optional() @Inject(API_HTTP_DEFAULT_HEADERS) apiHttpDefaultHeaders?: ApiHttpDefaultHeadersStruct
  ) {
    if (!(apiHttpDefaultHeaders instanceof HttpHeaders)) {
      apiHttpDefaultHeaders = new HttpHeaders(apiHttpDefaultHeaders);
    }
    this.defaultHeaders = apiHttpDefaultHeaders;
  }

  headersWithNoAuthorization(
    headers?: HttpHeaders | string | { [name: string]: string | string[] }
  ) {
    headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
    return headers.set(this.apiHttpAuthorizationHeaderName, 'none');
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    req = this.setDefaultHeaders(req);
    req = this.setAuthorizationHeader(req);
    if (this.chain === null) {
      const interceptors = this.injector.get(this.apiHttpInterceptorsInjectionToken, []);
      this.chain = interceptors.reduceRight(
          (next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req)
      .pipe(
        /**
         * @deprecated This should become a flexible and plugable interceptor
         */
        catchError((err: HttpErrorResponse) => this.apiHttpErrorsService.handleError(err))
      );
  }

  /**
   * @deprecated This should become a flexible and plugable interceptor
   */
  private setDefaultHeaders(req: HttpRequest<any>) {
    const headers = Array.from(this.defaultHeaders.keys())
      .reduce(
        (prevHeaders, headerName) => {
          // override only if not defined already
          if (!prevHeaders.has(headerName)) {
            prevHeaders = prevHeaders.set(
              headerName,
              this.defaultHeaders.get(headerName)
            );
          }
          return prevHeaders;
        },
        req.headers
      );
    return req.clone({
      headers
    });
  }

  /**
   * @deprecated This should become a flexible and plugable interceptor
   */
  private setAuthorizationHeader(req: HttpRequest<any>) {
    if (!req.headers.has(this.apiHttpAuthorizationHeaderName)) {
      // if header is set use the default token
      if (!this.authTokenService.isValid) {
        throw new Error('No JWT present or has expired');
      }
      return req.clone({
        headers: req.headers.set(
          this.apiHttpAuthorizationHeaderName,
          `Bearer ${this.authTokenService.value}`
        )
      });
    } else if (req.headers.get(this.apiHttpAuthorizationHeaderName) === 'none') {
      // if header is set and is given token, ensure the header is deleted
      return req.clone({
        headers: req.headers.delete(this.apiHttpAuthorizationHeaderName)
      });
    }
    return req;
  }
}
