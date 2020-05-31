import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

import { ComprarCrudService } from '../comprar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoPessoaFuncaoCrudService } from '../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { CotarCrudService } from '../../cotar/cotar.service';

@Injectable()
export class FormNovoResolve implements Resolve<Comprar> {

    constructor(
        private _service: ComprarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _eventoPessoaFuncaoService: EventoPessoaFuncaoCrudService,
        private _cotarService: CotarCrudService,
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        this._service.acao = 'Novo';
        this._eventoPessoaFuncaoService.filtro.codigo = 'FORNECEDOR';
        this._cotarService.filtro.utilizado = 'N';
        return {
            principal: this._service.novo(null),
            apoio: [
                {unidadeMedidaList: this._unidadeMedidaService.filtrar()},
                {eventoPessoaFuncao: this._eventoPessoaFuncaoService.filtrar()},
                {cotacaoList: this._cotarService.filtrar()},
            ]
        };
    }

}
