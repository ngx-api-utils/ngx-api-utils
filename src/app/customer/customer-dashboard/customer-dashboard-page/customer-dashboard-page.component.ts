import { Component, OnInit } from '@angular/core';
import { ApiHttpService, AuthTokenService } from 'ngx-api-utils';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-dashboard-page',
  templateUrl: './customer-dashboard-page.component.html',
  styleUrls: ['./customer-dashboard-page.component.scss']
})
export class CustomerDashboardPageComponent implements OnInit {

  constructor(
    private apiHttp: ApiHttpService,
    private authToken: AuthTokenService
  ) { }

  ngOnInit() {
    const userCredentials = {
      email: 'bruno@email.com',
      password: 'bruno'
    };
    this.apiHttp
      .post<{access_token: string}>('/auth/login', userCredentials)
      .pipe(
        map(({access_token}) => this.authToken.value$.next(access_token) && this.authToken.payload),
        tap(payload => console.log({payload})),
        switchMap(() => this.apiHttp.get('/products'))
      )
      .subscribe(console.log);
  }

}
