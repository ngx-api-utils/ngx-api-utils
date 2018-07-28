import {Component, OnInit} from '@angular/core';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';
import {map, tap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-customer-dashboard-page',
  templateUrl: './customer-dashboard-page.component.html',
  styleUrls: ['./customer-dashboard-page.component.scss']
})
export class CustomerDashboardPageComponent implements OnInit {
  constructor(private apiHttp: ApiHttpService, private authToken: AuthTokenService) {}

  ngOnInit() {
    of('Get the products, login if needed an auth token')
      .pipe(
        switchMap(() => {
          if (this.authToken.isValid()) {
            console.log('We have valid token, so use it');
            return of(this.authToken.payload);
          } else {
            console.log("We don't have valid token, so login");
            const userCredentials = {
              email: 'bruno@email.com',
              password: 'bruno'
            };
            return this.apiHttp.post<{access_token: string}>('/auth/login', userCredentials).pipe(
              map(({access_token}) => {
                this.authToken.value$.next(access_token);
                return this.authToken.payload;
              })
            );
          }
        }),
        tap(payload => console.log({payload})),
        switchMap(() => this.apiHttp.get('/products'))
      )
      .subscribe(console.log);
  }
}
