import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiHttpHandlerService } from './api-http-handler/api-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService extends HttpClient {

  constructor(
    private apiHttpHandler: ApiHttpHandlerService
  ) {
    super(apiHttpHandler);
  }

  headersWithNoAuthorization(
    headers?: HttpHeaders | string | { [name: string]: string | string[] }
  ) {
    return this.apiHttpHandler.headersWithNoAuthorization(headers);
  }

}
