import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProduzirService } from '../produzir.service';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(private servico: ProduzirService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this.servico.novo();
        return {principal: entidade, acao: "Novo"};
    }

}