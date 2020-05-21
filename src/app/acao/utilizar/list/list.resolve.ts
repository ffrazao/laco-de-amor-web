import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Utilizar } from './../../../comum/modelo/entidade/utilizar';
import { UtilizarCrudService } from '../utilizar.service';

@Injectable()
export class ListResolve implements Resolve<Utilizar[]> {

    constructor(
        private servico: UtilizarCrudService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return {
            principal: this.servico.fitrar()
        };
    }

}
