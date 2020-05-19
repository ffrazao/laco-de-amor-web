import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { ProdutoModelo } from './../../../comum/modelo/entidade/produto-modelo';
import { ProdutoModeloService } from '../produto-modelo.service';

@Injectable()
export class ListResolve implements Resolve<ProdutoModelo[]> {

    constructor(
        private servico: ProdutoModeloService
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
