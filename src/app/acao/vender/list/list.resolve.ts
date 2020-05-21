import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Vender } from './../../../comum/modelo/entidade/vender';
import { VenderCrudService } from '../vender.service';

@Injectable()
export class ListResolve implements Resolve<Vender[]> {

    constructor(
        private servico: VenderCrudService
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
