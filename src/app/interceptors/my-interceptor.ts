import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../service/login.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getAuthToken();
    let newHeaders = req.headers;
    if (token) {
      newHeaders = newHeaders.append('authtoken', token);
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      map(resp => {
        if (resp instanceof HttpResponse) {
          return  resp;
        }
      })
    );
  }
}
