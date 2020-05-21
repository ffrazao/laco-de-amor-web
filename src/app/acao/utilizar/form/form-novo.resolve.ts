import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Utilizar } from './../../../comum/modelo/entidade/utilizar';
import { UtilizarCrudService } from '../utilizar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoTipoCrudService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: UtilizarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _eventoTipoService: EventoTipoCrudService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        const entidade = new Utilizar();

        entidade.data = hojeStr();
        //entidade.eventoTipo = this._eventoTipoService.restore(2);

        return {
            principal: this._service.novo(entidade),
            acao: 'Novo',
            apoio: [
                this._unidadeMedidaService.lista,
            ],
        };
    }

}