import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private protectedPaths = ['/auth/client',"/site-payment/create-subscription"];

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
        // withCredentials: true,
      });

      return next.handle(cloned).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              console.log('event', event);
              const newAccessToken = event.headers.get('x-new-access-token');
              console.log('-------------------------------', newAccessToken);

              if (newAccessToken) {
                console.log('New access token received:', newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
              }
              if (event.status === 401) {
                console.log('removing access token and must be signed out');
                
                // localStorage.removeItem('accessToken');
              }
            }
          },
          error: (error) => {
            console.error('Error in request:', error);
            // localStorage.removeItem('accessToken');
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
