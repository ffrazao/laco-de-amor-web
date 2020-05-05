import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilizarService } from '../utilizar.service';
import { UnidadeMedidaService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoTipoService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: UtilizarService,
        private _unidadeMedidaService: UnidadeMedidaService,
        private _eventoTipoService: EventoTipoService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this._service.novo();

        entidade.data = hojeStr();        
        entidade.eventoTipo = this._eventoTipoService.restore(2);

        return {
            principal: entidade,
            acao: "Novo",
            apoio: [
                this._unidadeMedidaService.lista,
            ],
        };
    }

}