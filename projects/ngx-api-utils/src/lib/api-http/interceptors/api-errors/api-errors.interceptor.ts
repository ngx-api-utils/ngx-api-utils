import {Injectable, OnDestroy} from '@angular/core';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
import {HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorsInterceptor implements HttpInterceptor, OnDestroy {
  readonly apiErrors$: Observable<HttpErrorResponse> = new BehaviorSubject<HttpErrorResponse>(undefined);

  get lastApiError(): HttpErrorResponse | undefined {
    return (this.apiErrors$ as BehaviorSubject<HttpErrorResponse>).value;
  }

  ngOnDestroy(): void {
    (this.apiErrors$ as BehaviorSubject<any>).unsubscribe();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.interceptError(err)));
  }

  interceptError(errorResponse: HttpErrorResponse): Observable<never> {
    return throwError(errorResponse).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          this.triggerError(err);
        }
      })
    );
  }

  /** @internal */
  private triggerError(e: HttpErrorResponse): void {
    (this.apiErrors$ as BehaviorSubject<any>).next(e);
  }
}
