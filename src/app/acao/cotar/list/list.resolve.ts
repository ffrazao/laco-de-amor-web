import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Cotar } from './../../../comum/modelo/entidade/cotar';
import { CotarCrudService } from '../cotar.service';

@Injectable()
export class ListResolve implements Resolve<Cotar[]> {

    constructor(
        private _service: CotarCrudService
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
