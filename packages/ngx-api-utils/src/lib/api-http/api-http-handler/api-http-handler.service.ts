import { Injectable, Inject, Injector, InjectionToken } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpInterceptorHandler, API_HTTP_INTERCEPTORS_INJECTION_TOKEN } from '../interceptors';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpHandlerService implements HttpHandler {

  private chain: HttpHandler|null = null;

  constructor(
    private backend: HttpHandler,
    private injector: Injector,
    @Inject(API_HTTP_INTERCEPTORS_INJECTION_TOKEN)
    private apiHttpInterceptorsInjectionToken: InjectionToken<HttpInterceptor[]>
  ) {
  }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(this.apiHttpInterceptorsInjectionToken, []);
      this.chain = interceptors.reduceRight(
          (next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}
