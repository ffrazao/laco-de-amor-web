import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Comprar } from './../../../comum/modelo/entidade/comprar';
import { ComprarService } from '../comprar.service';

@Injectable()
export class ListResolve implements Resolve<Comprar[]> {

    constructor(
        private servico: ComprarService
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
