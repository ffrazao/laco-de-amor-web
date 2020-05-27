import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Vender } from './../../../comum/modelo/entidade/vender';
import { VenderCrudService } from '../vender.service';

@Injectable()
export class ListResolve implements Resolve<Vender[]> {

    constructor(
        private _service: VenderCrudService
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
