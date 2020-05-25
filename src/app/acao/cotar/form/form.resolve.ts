import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Cotar } from '../../../comum/modelo/entidade/cotar';
import { CotarCrudService } from '../cotar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';

@Injectable()
export class FormResolve implements Resolve<Cotar> {

    constructor(
        private _service: CotarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return {
            principal: this._service.restore(route.params.id),
            acao: 'Visualizar',
            apoio: [
                {unidadeMedidaList: this._unidadeMedidaService.filtrar()}
            ]
        };
    }

}
