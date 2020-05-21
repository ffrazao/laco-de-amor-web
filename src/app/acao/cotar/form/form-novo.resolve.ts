import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { CotarCrudService } from '../cotar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoTipoCrudService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';
import { Cotar } from 'src/app/comum/modelo/entidade/cotar';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: CotarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _eventoTipoService: EventoTipoCrudService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        const entidade = new Cotar();

        entidade.data = hojeStr();
        //entidade.eventoTipo = this._eventoTipoService.restore(1);

        return {
            principal: this._service.novo(entidade),
            acao: 'Novo',
            apoio: [this._unidadeMedidaService.lista]
        };
    }

}