import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Produzir } from '../produzir';
import { ProduzirService } from '../produzir.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(private servico: ProduzirService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this.servico.restore(route.params['id']);
        return {
            principal: entidade,
            acao: 'Visualizar'
        };
    }

}