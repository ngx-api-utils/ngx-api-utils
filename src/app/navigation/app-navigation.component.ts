import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from 'ngx-api-utils';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {
  constructor(private authToken: AuthTokenService) {}
  navbarOpen: boolean = false;
  logged$: Observable<boolean>;

  ngOnInit() {
    this.logged$ = this.authToken.value$.pipe(map(x => x !== undefined));
  }

  logout() {
    this.authToken.value$.next(undefined);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
