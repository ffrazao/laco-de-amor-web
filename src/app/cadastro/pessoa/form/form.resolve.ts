import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { PessoaService } from '../pessoa.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(private servico: PessoaService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this.servico.restore(route.params['id']);
        return {
            principal: entidade,
            acao: 'Visualizar'
        };
    }

}