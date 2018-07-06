import { Injectable, Inject, Optional } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthTokenService } from '../../auth-token/public_api';
import { API_HTTP_BASE_URL } from '../api-http-base-url';
import { API_HTTP_AUTHORIZATION_HEADER_NAME } from '../api-http-authorization-header-name';
import { API_HTTP_DEFAULT_HEADERS, ApiHttpDefaultHeadersStruct } from '../api-http-default-headers';
import { ApiHttpErrorsService } from '../api-http-errors/api-http-errors.service';

/**
 * @deprecated This should become a flexible handler requiring interceptors from API_HTTP_INTERCEPTORS providers or so
 */
@Injectable({
  providedIn: 'root'
})
export class ApiHttpHandlerService implements HttpHandler {

  private defaultHeaders: HttpHeaders;

  constructor(
    private handler: HttpHandler,
    private authTokenService: AuthTokenService,
    private apiHttpErrorsService: ApiHttpErrorsService,
    @Inject(API_HTTP_BASE_URL) private apiHttpBaseUrl: string,
    @Inject(API_HTTP_AUTHORIZATION_HEADER_NAME) private apiHttpAuthorizationHeaderName: string,
    @Optional() @Inject(API_HTTP_DEFAULT_HEADERS) apiHttpDefaultHeaders?: ApiHttpDefaultHeadersStruct
  ) {
    if (!(apiHttpDefaultHeaders instanceof HttpHeaders)) {
      apiHttpDefaultHeaders = new HttpHeaders(apiHttpDefaultHeaders);
    }
    this.defaultHeaders = apiHttpDefaultHeaders;
    // trim the last / e.g. `//localhost:3000/api/` -> `//localhost:3000/api`
    this.apiHttpBaseUrl = apiHttpBaseUrl.replace(/\/+$/, '');
  }

  headersWithNoAuthorization(
    headers?: HttpHeaders | string | { [name: string]: string | string[] }
  ) {
    headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
    return headers.set(this.apiHttpAuthorizationHeaderName, 'none');
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `${this.apiHttpBaseUrl}${req.url}`
    });
    req = this.setDefaultHeaders(req);
    req = this.setAuthorizationHeader(req);
    return this.handler.handle(req)
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
