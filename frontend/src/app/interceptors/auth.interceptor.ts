import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private protectedPaths = ['/auth/client',"/site-payment/site-payment","/site-payment/UserSubscription", '/auth/request/pending-child-request', '/auth/request/associate-children', '/auth/progress', '/progress','/courses','/reservations','/auth/coach'];
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    const isProtectedRoute = this.protectedPaths.some((path) =>
      req.url.includes(path)
    );

    console.log('accessToken', accessToken);

    if (accessToken && isProtectedRoute) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return next.handle(cloned).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              console.log('event ----- ', event);
              const newAccessToken = event.headers.get('x-new-access-token');
              console.log('-------------------------------', newAccessToken);

              if (newAccessToken) {
                console.log('New access token received:', newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
              }
              if (event.status === 401 ) {
                localStorage.removeItem('accessToken'); 
                this.router.navigate(['/']);
                
              }
            }
          },
          error: (error) => {
            if (error.status === 401 && error.error === 'RefreshTokenExpired') {
              console.log('removing access token and must be signed out');
            }
            console.error('Error in request:', error);
          },
        })
      );
    } else {
      return next.handle(req).pipe(
        tap({
          next: (response) => {
            console.log('response', response);
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
    }
  }
}

/*
private addTokenToRequest(request: HttpRequest<any>) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
    }
    return request;
  }

*/
