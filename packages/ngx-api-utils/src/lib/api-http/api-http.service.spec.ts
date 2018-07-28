import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule, HttpHandler} from '@angular/common/http';
import {ApiHttpService} from './api-http.service';
import {ApiHttpHandlerService} from './api-http-handler/api-http-handler.service';

describe('ApiHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiHttpService,
        {
          provide: ApiHttpHandlerService,
          useClass: HttpHandler
        }
      ]
    });
  });

  it('should be created', inject([ApiHttpService], (service: ApiHttpService) => {
    expect(service).toBeTruthy();
  }));
});
