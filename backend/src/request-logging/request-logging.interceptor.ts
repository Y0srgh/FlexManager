import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap((response) => {
        console.log('Request handled successfully');
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();
        console.log('Request Details:', req['accessToken']);
        
        // res.set('x-new-access-token', req['accessToken']);
        // res.setHeader('x-new-access-token', req['accessToken']);
        res?.setHeader('access-control-allow-origin', 'http://localhost:4200');
        res.setHeader('access-control-allow-origin', 'http://localhost:4200');
        console.log('response header', res.getHeaders());
        const newAccessToken = req['accessToken'];
        if (newAccessToken) {
          const accessResponse = res.getHeader('x-new-access-token');
          if (!accessResponse) {
            res.setHeader('x-new-access-token', newAccessToken);
            console.log(
              'Set x-new-access-token:',
              res.get('x-new-access-token'),
            );
          }
        } else {
          res.removeHeader('x-new-access-token');
        }
      }),
      catchError((error) => {
        console.log(error);
        throw error;
      }),
    );
  }
}
