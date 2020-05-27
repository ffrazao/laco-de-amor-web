import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { DomService } from '../dom.service';
import { MirrorComponent } from './../../componente/mirror/mirror.component';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private _domService: DomService,
        // private _localStorageService: LocalStorageService,
        // private _loginService: LoginService,
        // private _errorDialogService: ErrorDialogService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // criar um componente mirror no body
        let mirror = this._domService.appendComponentToBody(MirrorComponent);

        // captar o token de acesso
        // const token = this._localStorageService.token();
        // if ((token) && (request.url !== `${environment.AUTHORIZATION_SERVER}`)) {
        //     request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        // }
        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                // desligar o mirror
                mirror = this._domService.destroyComponentToBody(mirror);

                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // this._errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // desligar o mirror
                mirror = this._domService.destroyComponentToBody(mirror);

                // let data = {};
                // data = {
                //     reason: error && error.error.reason ? error.error.reason : error.message ? error.message : '',
                //     status: error.status
                // };
                // this._errorDialogService.openDialog(data);
                // console.log('error captado', error);
                return throwError(error);
            }));
    }
}
