import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';

@Component({
  selector: 'app-customer-sign-in-page',
  templateUrl: './customer-sign-in-page.component.html',
  styleUrls: ['./customer-sign-in-page.component.scss']
})
export class CustomerSignInPageComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private apiHttp: ApiHttpService, private authToken: AuthTokenService) {}

  onSubmit() {
    if (!this.form.valid) {
      return false;
    }
    console.log('authentication attempt');
    const {email, password} = this.form.value;
    this.apiHttp
      .post<{access_token: string}>(
        '/auth/login',
        {email, password},
        {
          // headers: this.apiHttp.headersWithNoAuthorization()
        }
      )
      .subscribe(({access_token}) => {
        console.log('authentication success');
        this.authToken.value$.next(access_token);
      });
  }
}
