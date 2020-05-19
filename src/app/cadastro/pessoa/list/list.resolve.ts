import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { PessoaService } from '../pessoa.service';

@Injectable()
export class ListResolve implements Resolve<Pessoa[]> {

    constructor(
        private servico: PessoaService
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
