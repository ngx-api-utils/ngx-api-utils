import {Injectable, OnDestroy, Optional, Inject} from '@angular/core';
import {CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthTokenService} from '../auth-token/public-api';
import {API_AUTH_GUARD_PUBLIC_ONLY_ROUTES} from './api-auth-guard-public-only-routes';
import {API_AUTH_GUARD_URL_FOR_AUTHENTICATED} from './api-auth-guard-url-for-authenticated';
import {API_AUTH_GUARD_URL_FOR_AUTHENTICATION} from './api-auth-guard-url-for-authentication';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthGuardService implements CanActivate, CanActivateChild, OnDestroy {
  protected onAuthTokenChangeSubscription: Subscription;
  protected returnUrlQueryParam = 'returnUrl';

  constructor(
    protected authToken: AuthTokenService,
    protected router: Router,
    @Optional()
    @Inject(API_AUTH_GUARD_URL_FOR_AUTHENTICATED)
    protected urlForAuthenticated?: string,
    @Optional()
    @Inject(API_AUTH_GUARD_URL_FOR_AUTHENTICATION)
    protected urlForAuthentication?: string,
    @Optional()
    @Inject(API_AUTH_GUARD_PUBLIC_ONLY_ROUTES)
    protected publicOnlyRoutes?: RegExp
  ) {
    this.urlForAuthenticated = this.urlForAuthenticated || '/';
    this.urlForAuthentication = this.urlForAuthentication || '/login';
    this.onAuthTokenChangeSubscription = this.authToken.value$.subscribe(() => {
      this.checkCurrentUrl();
    });
  }

  ngOnDestroy() {
    if (this.onAuthTokenChangeSubscription) {
      this.onAuthTokenChangeSubscription.unsubscribe();
      this.onAuthTokenChangeSubscription = undefined;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    const tokenIsValid = this.authToken.isValid();
    // Check if the user is logged in and trying to get on e.g. /login in that case -> /dashboard
    const isPublicOnlyPage = this.publicOnlyRoutes && this.publicOnlyRoutes.test(url);
    if (tokenIsValid) {
      // logged in user
      if (isPublicOnlyPage) {
        // logged in user tries accessing public only page e.g. /login so Deny and redirect -> /dashboard
        this.navigateForAuthenticated(route, state);
        return false;
      } else {
        // logged in user tries accessing page for logged in users so Allow
        return true;
      }
    } else {
      // not logged in user
      if (isPublicOnlyPage) {
        // not logged in user tries accessing public only page e.g. /login so Allow
        return true;
      } else {
        // not logged in user tries accessing protected page e.g. /dashboard so Deny
        this.navigateForAuthentication(route, state);
        return false;
      }
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkCurrentUrl() {
    if (this.router.navigated) {
      this.canActivate(this.router.routerState.root.snapshot, this.router.routerState.snapshot);
    }
  }

  /**
   * Navigate from public only route to route for authenticated users
   */
  protected navigateForAuthenticated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const gotoUrl = route.queryParams[this.returnUrlQueryParam] || this.urlForAuthenticated;
    return this.router.navigateByUrl(gotoUrl);
  }

  /**
   * Navigate from route for authenticated users to route to authenticate
   */
  protected navigateForAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const returnUrl = route.queryParams[this.returnUrlQueryParam] || state.url;
    // Store the attempted URL for login form to return back to returnUrl
    return this.router.navigate([this.urlForAuthentication], {
      queryParams: {
        [this.returnUrlQueryParam]: returnUrl
      }
    });
  }
}
