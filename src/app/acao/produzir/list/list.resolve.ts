import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Produzir } from './../../../comum/modelo/entidade/produzir';
import { ProduzirCrudService } from '../produzir.service';

@Injectable()
export class ListResolve implements Resolve<Produzir[]> {

    constructor(
        private _service: ProduzirCrudService
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
