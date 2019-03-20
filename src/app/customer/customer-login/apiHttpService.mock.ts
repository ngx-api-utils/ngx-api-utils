import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';

@Injectable()
export class ApiHttpServiceMock {
  constructor() {}

  post(): Observable<boolean> {
    return from([true]);
  }
  headersWithNoAuthorization(): string {
    return 'headers';
  }
}
