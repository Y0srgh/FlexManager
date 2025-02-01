import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Adjust the path based on your project

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error',error);
        
        if (error.status === 401) {
          // Unauthorized, try refreshing the token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              // Retry the failed request with the new token
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
              });
              return next.handle(newReq);
            }),
            catchError(refreshError => {
              this.authService.logout();
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
