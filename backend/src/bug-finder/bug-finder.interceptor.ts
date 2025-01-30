import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class BugFinderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('===== Incoming Request =====');
    console.log(`Method: ${request.method}`);
    console.log(`URL: ${request.url}`);
    console.log('Headers:', request.headers);
    console.log('Cookies:', request.cookies);  // Important for debugging refresh token issues
    console.log('============================');
    
    return next.handle().pipe(
      tap((response) => {
        console.log('===== Response Sent =====');
        console.log('response');
        console.log('=========================');
      }),
    );
  }
}
