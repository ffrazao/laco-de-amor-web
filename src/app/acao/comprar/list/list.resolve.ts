import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Comprar } from './../../../comum/modelo/entidade/comprar';
import { ComprarCrudService } from '../comprar.service';

@Injectable()
export class ListResolve implements Resolve<Comprar[]> {

    constructor(
        private _service: ComprarCrudService
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
