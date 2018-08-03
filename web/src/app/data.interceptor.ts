import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataInterceptor implements HttpInterceptor {

    intercept(
        pHttpRequest: HttpRequest<any>,
        pHttpHandler: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!pHttpRequest.headers.has('Content-Type')) {
            pHttpRequest = pHttpRequest.clone({ headers: pHttpRequest.headers.set('Content-Type', 'application/json') });
        }

        pHttpRequest = pHttpRequest.clone({ headers: pHttpRequest.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(pHttpRequest.headers));
        return pHttpHandler.handle(pHttpRequest);
    }
}
