import { Injectable, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * @deprecated This should become a flexible and plugable interceptor
 */
  @Injectable({
  providedIn: 'root'
})
export class ApiHttpErrorsService implements OnDestroy {

  public readonly coreApiErrors$: Observable<HttpErrorResponse> =
    new BehaviorSubject<HttpErrorResponse>(null);

  ngOnDestroy() {
    (this.coreApiErrors$ as BehaviorSubject<any>).unsubscribe();
  }

  public handleError(errorResponse: HttpErrorResponse) {
    // TODO: convert the error to a reasonable object if there is a way to recognize it
    // if (errorResponse.headers.get('content-type') === 'application/problem+json') {
    //   errorResponse = Object.assign(
    //     new CoreApiProblemResponse(),
    //     errorResponse.error,
    //     { _originalErrorResponse: errorResponse }
    //   );
    // }
    return throwError(errorResponse)
      .pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            this.triggerError(err);
          }
        })
      );
  }

  /** @internal */
  private triggerError(e: HttpErrorResponse): void {
    (this.coreApiErrors$ as BehaviorSubject<any>).next(e);
  }

}
