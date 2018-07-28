import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiHttpHandlerService} from './api-http-handler/api-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService extends HttpClient {
  constructor(protected apiHttpHandler: ApiHttpHandlerService) {
    super(apiHttpHandler);
  }

  /**
   * @experimental the headersWithNoAuthorization support is experimental
   * see {@link ApiAuthorizationHeaderInterceptor#headersWithNoAuthorization} for details
   */
  headersWithNoAuthorization(headers?: HttpHeaders | string | {[name: string]: string | string[]}): HttpHeaders {
    return this.apiHttpHandler.headersWithNoAuthorization(headers);
  }
}
