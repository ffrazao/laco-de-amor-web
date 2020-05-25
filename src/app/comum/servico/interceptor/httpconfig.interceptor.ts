import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../componente/error-dialog/errordialog.service';
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
import { DomService } from '../servico/dom.service';
import { MirrorComponent } from '../componente/mirror/mirror.component';
import { Token } from 'src/app/entidade/token';
import { environment } from 'src/environments/environment';
import { URL_OAUTH_TOKEN, LoginService } from 'src/app/login/login.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(
        private _errorDialogService: ErrorDialogService,
        private _domService: DomService,
        private _loginService: LoginService
    ) {
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // criar um componente mirror no body
        let mirror = this._domService.appendComponentToBody(MirrorComponent);

        // captar o token de acesso
        let token: Token = this._loginService.token();
        if ((token) && (request.url !== `${environment.AUTORIZADOR_SERVER_URL}${URL_OAUTH_TOKEN}`)) {
            request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token.access_token}`) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

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

                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : error.message ? error.message : '',
                    status: error.status
                };
                this._errorDialogService.openDialog(data);
                console.log('error captado', error);
                return throwError(error);
            }));
    }
}