import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../../../auth-token/public_api';
import { API_HTTP_AUTHORIZATION_HEADER_NAME } from '../../api-http-authorization-header-name';

@Injectable()
export class ApiAuthorizationHeaderInterceptor implements HttpInterceptor {

  constructor(
    @Inject(API_HTTP_AUTHORIZATION_HEADER_NAME) private apiHttpAuthorizationHeaderName: string,
    private authTokenService: AuthTokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.reqWithAuthorizationHeader(req);
    return next.handle(req);
  }

  /**
   * @experimental the headersWithNoAuthorization support is experimental
   * it might be considered in future this capability to be extracted
   * in an abstract class `ApiNoAuthorizationHeaderInterceptor`
   * then we can have `ApiAuthorizationHeaderInterceptor` implement the interface
   * and provide it using forwardRef or similar.
   * Yet this seems too complex for this stage.
   */
  headersWithNoAuthorization(
    headers?: HttpHeaders | string | {[name: string]: string | string[]}
  ): HttpHeaders {
    headers = headers instanceof HttpHeaders ? headers : new HttpHeaders(headers);
    return headers.set(this.apiHttpAuthorizationHeaderName, '');
  }

  private reqWithAuthorizationHeader(req: HttpRequest<any>) {
    if (!req.headers.has(this.apiHttpAuthorizationHeaderName)) {
      // if header is set use the default token
      if (!this.authTokenService.isValid()) {
        throw new Error('No AuthToken present or has expired');
      }
      req = req.clone({
        headers: req.headers.set(
          this.apiHttpAuthorizationHeaderName,
          `Bearer ${this.authTokenService.value}`
        )
      });
    } else if (!req.headers.get(this.apiHttpAuthorizationHeaderName)) {
      // if header is set and is given token, ensure the header is deleted
      req = req.clone({
        headers: req.headers.delete(this.apiHttpAuthorizationHeaderName)
      });
    }
    // otherwise leave whatever is set so far
    return req;
  }
}
