import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Produzir } from './../../../comum/modelo/entidade/produzir';
import { ProduzirService } from '../produzir.service';

@Injectable()
export class ListResolve implements Resolve<Produzir[]> {

    constructor(
        private servico: ProduzirService
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
