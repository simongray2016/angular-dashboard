import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
            location.reload(true);
          }

          const error = err.error.massage || err.statusText;
          return throwError(error);
        }));
    }
}

export const ErrorInterceptorProviders = { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true };
