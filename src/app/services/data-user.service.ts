import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, retry } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  user: any;

  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get('https://hvcg-tm.herokuapp.com/security/currentUser')
      .pipe(
        tap(user => {
          this.user = user;
        }),
        retry(1),
        catchError(err => this.handleError(err))
      );
  }

  private handleError(err: any): ObservableInput<any> {
    console.log(err);
    return err;
  }
}
