import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // console.log('Request Details:');
    // console.log('Method:', request.method);
    // console.log('URL:', request.url);
    // console.log('Headers:', request.headers);
    // console.log('Body:', request.body);
    // console.log('Query Params:', request.query);
    // const refreshToken = request.cookies['refreshToken']; 
    // console.log('Refresh Token:', refreshToken);
    return next.handle().pipe(
      tap((response) => {
        // console.log(response);
        console.log('Request handled successfully');
      }),
      catchError((error) => {
        console.log(error);
        throw error; 

      }),
    );
  }
}
