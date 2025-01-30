import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private protectedPaths = ['/auth/client'];

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
        },
        withCredentials: true,
      });
      return next.handle(cloned);
    }
    return next.handle(req);
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
