import {Injectable, Inject, Injector, InjectionToken} from '@angular/core';
import {HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpInterceptorHandler, API_HTTP_INTERCEPTORS_INJECTION_TOKEN} from '../interceptors';
import {ApiAuthorizationHeaderInterceptor} from '../interceptors/api-authorization-header/api-authorization-header.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpHandlerService implements HttpHandler {
  protected chain: HttpHandler | null = null;
  protected apiAuthorizationInterceptor: ApiAuthorizationHeaderInterceptor | null = null;

  constructor(
    protected backend: HttpHandler,
    protected injector: Injector,
    @Inject(API_HTTP_INTERCEPTORS_INJECTION_TOKEN) protected apiHttpInterceptorsInjectionToken: InjectionToken<HttpInterceptor[]>
  ) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(this.apiHttpInterceptorsInjectionToken, []);
      this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }

  /**
   * @experimental the headersWithNoAuthorization support is experimental
   * see {@link ApiAuthorizationHeaderInterceptor#headersWithNoAuthorization} for details
   */
  headersWithNoAuthorization(headers?: HttpHeaders | string | {[name: string]: string | string[]}): HttpHeaders {
    if (this.apiAuthorizationInterceptor === null) {
      this.apiAuthorizationInterceptor = this.injector
        .get(this.apiHttpInterceptorsInjectionToken, [])
        .find(interceptor => interceptor instanceof ApiAuthorizationHeaderInterceptor) as ApiAuthorizationHeaderInterceptor;
    }
    return this.apiAuthorizationInterceptor.headersWithNoAuthorization(headers);
  }
}
