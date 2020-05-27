import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { ComprarCrudService } from '../comprar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoPessoaFuncaoCrudService } from '../../evento-pessoa-funcao/evento-pessoa-funcao.service';

@Injectable()
export class FormResolve implements Resolve<Comprar> {

    constructor(
        private _service: ComprarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _eventoPessoaFuncaoService: EventoPessoaFuncaoCrudService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        this._eventoPessoaFuncaoService.filtro.codigo = 'FORNECEDOR';
        return {
            principal: this._service.restore(route.params.id),
            acao: 'Visualizar',
            apoio: [
                {unidadeMedidaList: this._unidadeMedidaService.filtrar()},
                {eventoPessoaFuncao: this._eventoPessoaFuncaoService.filtrar()}
            ]
        };
    }

}
