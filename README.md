[![npm version](https://badge.fury.io/js/ngx-api-utils.svg)](https://www.npmjs.com/ngx-api-utils)

# ngx-api-utils

Quickly integrate any HTTP API (REST, Ajax, and any other) with [Angular](https://angular.io/) using this not strongly opinionated library of utilities and helpers.

Inspired by:
- https://github.com/auth0/angular2-jwt
- https://angular.io/guide/http#intercepting-requests-and-responses.

Thanks to the respective developers, people and contributors of:

- [Angular](https://angular.io/) 6+
- [@angular/cli](https://github.com/angular/angular-cli) and [it's latest capabilities of creating and maintaining libraries](https://github.com/angular/angular-cli/wiki/stories-create-library)
- [local fork of fake-api-jwt-json-server](https://github.com/ngx-api-utils/ngx-api-utils/tree/master/fake-api-jwt-json-server) from https://github.com/techiediaries/fake-api-jwt-json-server based on this wonderful article https://www.techiediaries.com/fake-api-jwt-json-server/ and utilizing this awesome https://github.com/typicode/json-server
- [VS Code](https://code.visualstudio.com/)

## Getting started

### Installation

To install the package from npm - run `npm install ngx-api-utils`

### Setup

```typescript
import { NgxApiUtilsModule } from 'ngx-api-utils';

@NgModule({
  ...
  imports: [NgxApiUtilsModule,...]
  ...
})
export class AppModule { }
```

### Usage

The package consists of couple of main services and a module that you would use:

- [`AuthTokenService`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/auth-token/auth-token.service.spec.ts) to allow you to easily work with any kind of tokens, including but not limited to JWT, Oauth2 with JWT container, etc.
  - which you would provide with a proper [`TokenDecoder`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/auth-token/token-decoder/token-decoder.spec.ts)
  - you would also like to provide with proper [`TokenPayload`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/auth-token/token-payload/token-payload.ts) by extending it with the properties you have in the token especially if you are using [JWT Token](https://jwt.io/introduction/) or other that can contain relevant for your application information
  - you might want to provide it with your custom [`TokenStorage`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/auth-token/token-storage/token-storage.ts) implementation especially if you are not happy with the default [`localStorage`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/auth-token/token-storage/token-storage.ts#L13)
- [`ApiHttpService`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-http/api-http.service.spec.ts) that behaves 100% like Angular's [`HttpClient`](https://angular.io/api/common/http/HttpClient), but helps you by utilizing for you
  - the `AuthTokenService` internally and sending the token on each request using [`ApiAuthorizationHeaderInterceptor`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-http/interceptors/api-authorization-header/api-authorization-header.interceptor.ts)
  - also allows you to set API base url, by providing where the HTTP API is thanks to [`API_HTTP_BASE_URL`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-http/api-http-base-url.ts)
  - also allows you to set default HTTP headers with [`ApiDefaultHeadersInterceptor`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-http/interceptors/api-default-headers/api-default-headers.interceptor.ts)
  - also only in case needed you can plug [`ApiErrorsInterceptor`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-http/interceptors/api-errors/api-errors.interceptor.ts) and read through it the last error
  - or even better - have your own implementation of any interceptor you need - to handle errors, transform results or anything you would the same way you would do for Angular's `HttpClient`, just provide it like the defaults are provided with `API_HTTP_INTERCEPTORS` injection token e.g. `{provide: API_HTTP_INTERCEPTORS, useClass: YourCoolInterceptor, multi: true}` to line up with the rest of the default provided [`API_HTTP_INTERCEPTORS`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/ngx-api-utils.module.ts#API_HTTP_INTERCEPTORS)
- [`ApiAuthGuardService`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/api-auth-guard/api-auth-guard.service.ts) that is a perfectly sane option of you just have public and private part that needs to be protected based on `AuthTokenService` validity and you want a bit more
  - you can of course configure it with urls for `API_AUTH_GUARD_URL_FOR_AUTHENTICATED` and `API_AUTH_GUARD_URL_FOR_AUTHENTICATION`, also a RegExp for `API_AUTH_GUARD_PUBLIC_ONLY_ROUTES`
- [`NgxApiUtilsModule`](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/ngx-api-utils.module.ts) that provides a default set of interceptors for `API_HTTP_INTERCEPTORS` used by the `ApiHttpService` which you can configure through providing your own values for the relevant injection tokens

For more details, please check:

- the [Demo app](https://github.com/ngx-api-utils/ngx-api-utils/tree/master/src) (TBD)
- the key [ngx-api-utils specs](https://github.com/ngx-api-utils/ngx-api-utils/blob/master/packages/ngx-api-utils/src/lib/ngx-api-utils.spec.ts)

## Demo

This repository contains a [Demo app](https://github.com/ngx-api-utils/ngx-api-utils/tree/master/src) (TBD) that is intended to show a bit more complex app and how the `ngx-api-utils` package fits in. 

In the demo beside the usage of `ngx-api-utils` I would strongly recommend checking:

- the overall structure of well organized lazy loaded modules https://github.com/ngx-api-utils/ngx-api-utils/tree/master/src/app though the router configurations
- the overall multi-layout system for the UI (HTML/CSS), that allows you to have different UI layouts for the different app sections (roles)
- the overall way how to organize your services around and build object models that utilize the `ngx-api-utils` (TBD)

## Want to help?

The project uses the following things, you should get familiar with:

- [@angular/cli's capabilities of creating and maintaining libraries](https://github.com/angular/angular-cli/wiki/stories-create-library)
- local fork of this repository https://github.com/techiediaries/fake-api-jwt-json-server based on this wonderful article https://www.techiediaries.com/fake-api-jwt-json-server/ and utilizing this awesome https://github.com/typicode/json-server
- custom set of scripts that you can check https://github.com/ngx-api-utils/ngx-api-utils/blob/master/package.json#scripts that allows you to:
  - start the Demo app with `npm run start` 
  - run the whole set of linters `npm run start`
  - run the e2e tests of the Demo app `npm run e2e` (TBD)
  - build the `ngx-api-utils` package itself through `npm run ngx-api-utils:build`
  - or run it's unit and integration tests through `npm run ngx-api-utils:test`
  - and more, please do check the scripts

Please feel free to submit PRs for the following things:

- **test coverage** - unit; integration tests; e2e tests on the demo app;
- **demo project** - showing the package in action in a bit more advanced architecture of modules and routing, namely public section, customer section, admin section of the app
- **demo project fake api** - needs updates according to what the demo would show
- **contribute further** - any additional features and bug fixes

We highly appreciate your contribution!
