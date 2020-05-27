import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Utilizar } from './../../../comum/modelo/entidade/utilizar';
import { UtilizarCrudService } from '../utilizar.service';

@Injectable()
export class ListResolve implements Resolve<Utilizar[]> {

    constructor(
        private _service: UtilizarCrudService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        this._service.acao = 'Listar';
        return {
            principal: this._service.filtrar()
        };
    }

}
