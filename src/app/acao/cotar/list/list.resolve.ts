import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Cotar } from './../../../comum/modelo/entidade/cotar';
import { CotarCrudService } from '../cotar.service';

@Injectable()
export class ListResolve implements Resolve<Cotar[]> {

    constructor(
        private servico: CotarCrudService
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
