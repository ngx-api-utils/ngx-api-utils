import { Component } from '@angular/core';
import { AuthTokenService } from 'ngx-api-utils';
import { TokenPayload } from 'packages/ngx-api-utils/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-api-utils';
  constructor(
    authToken: AuthTokenService<TokenPayload>
  ) {
    console.log(authToken.isValid());
  }

}
