import {Injectable, Inject} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_HTTP_BASE_URL} from '../../api-http-base-url';

@Injectable({
  providedIn: 'root'
})
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_HTTP_BASE_URL) public apiHttpBaseUrl: string) {
    // trim the last / e.g. `//localhost:3000/api/` -> `//localhost:3000/api`
    this.apiHttpBaseUrl = apiHttpBaseUrl.replace(/\/+$/, '');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: `${this.apiHttpBaseUrl}${req.url}`
    });
    return next.handle(req);
  }
}
