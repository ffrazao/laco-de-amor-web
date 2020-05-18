import { Observable } from 'rxjs';
import { LocalStorageService } from './../local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private _localStorageService: LocalStorageService,
        private _router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const logado = this._localStorageService.estaLogado;

        if (!logado) {
            this._router.navigate(['/', 'login']);
        }
        return logado;
    }
}