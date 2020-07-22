import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from , Observable} from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ 
      headers: req.headers.set("Access-Control-Allow-Origin", "http://localhost:4200"),
    });
    return next.handle(modifiedReq);
  }
}