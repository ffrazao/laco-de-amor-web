import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CotarService } from '../cotar.service';
import { EventoTipo } from 'src/app/comum/entidade/modelo/evento-tipo';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(private servico: CotarService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this.servico.novo();
        let data = new Date();
        entidade.data = ("0" + data.getDate()).substr(-2) + "/"
            + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();

        entidade.eventoTipo = new EventoTipo();
        entidade.eventoTipo.id = 1;
        entidade.eventoTipo.nome = 'Cotar';
        entidade.eventoTipo.codigo = 'COTAR';

        return { principal: entidade, acao: "Novo" };
    }

}