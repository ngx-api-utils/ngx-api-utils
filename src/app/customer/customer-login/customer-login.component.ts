import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiHttpService, AuthTokenService} from 'ngx-api-utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private apiHttp: ApiHttpService, private authToken: AuthTokenService, private router: Router) {}

  onSubmit() {
    if (!this.form.valid) {
      return false;
    }
    const {email, password} = this.form.value;
    this.apiHttp
      .post<{access_token: string}>(
        '/auth/login',
        {email, password},
        {
          headers: this.apiHttp.headersWithNoAuthorization()
        }
      )
      .subscribe(({access_token}) => {
        console.log('authentication success');
        this.authToken.value$.next(access_token);
        this.router.navigate(['/customer/home']);
      });
  }
}
