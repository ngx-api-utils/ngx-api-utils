import { TestBed, inject } from '@angular/core/testing';
import { NgxApiUtilsModule, AuthTokenService, ApiHttpService } from 'ngx-api-utils';
import { Polly } from '@pollyjs/core';

fdescribe('ngx-api-utils', () => {
  const apiUtilsConfig = {
    baseUrl: 'http://example.com/api'
  };
  let polly: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxApiUtilsModule.forRoot(apiUtilsConfig)
      ]
    });
    polly = new Polly('ngx-api-utils');
  });

  afterEach(async () => {
    await polly.stop();
  });

  describe('AuthTokenService', () => {
    it('should be provided', inject([AuthTokenService], (service: AuthTokenService) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('ApiHttpService', () => {
    it('should be provided', inject([ApiHttpService], (service: ApiHttpService) => {
      expect(service).toBeTruthy();
    }));
    it('should prefix the requests with the `baseUrl` configured', async () => {
      return inject([ApiHttpService], async (service: ApiHttpService) => {
        const {server} = polly;
        const endpoint = '/products';
        server.get(`${apiUtilsConfig.baseUrl}/*`).intercept((req, res) => {
          res.sendStatus(404);
        });
        server.get(`${apiUtilsConfig.baseUrl}${endpoint}`).intercept((req, res) => {
          res.status(200).json({success: true});
        });
        const success = (await service.get<{success: boolean}>(endpoint).toPromise()).success;
        expect(success).toBeTruthy('response should be success');
      })();
    });
  });
});
