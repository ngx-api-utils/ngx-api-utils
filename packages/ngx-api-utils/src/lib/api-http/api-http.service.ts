import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHttpHandlerService } from './api-http-handler/api-http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService extends HttpClient {
  constructor(
    apiHttpHandler: ApiHttpHandlerService
  ) {
    super(apiHttpHandler);
  }
}
