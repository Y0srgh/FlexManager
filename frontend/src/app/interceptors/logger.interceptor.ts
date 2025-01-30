import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`Outgoing Request: ${req.method} ${req.url}`, req.body);

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(`Response from ${req.url}:`, event.body);
        }
      })
    );
  }
}
