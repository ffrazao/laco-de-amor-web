import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { EventoPessoaFuncaoCrudService } from './../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { EventoPessoa } from './../../../comum/modelo/entidade/evento-pessoa';
import { VenderCrudService } from '../vender.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoTipoCrudService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';
import { Vender } from 'src/app/comum/modelo/entidade/vender';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: VenderCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _eventoTipoService: EventoTipoCrudService,
        private _eventoPessoaFuncaoService: EventoPessoaFuncaoCrudService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        const entidade = new Vender();

        entidade.data = hojeStr();
        //entidade.eventoTipo = this._eventoTipoService.restore(2);
        const eventoPessoa = new EventoPessoa();
        eventoPessoa.eventoPessoaFuncao = this._eventoPessoaFuncaoService.lista[2];
        entidade.eventoPessoaList = [];
        entidade.eventoPessoaList.push(eventoPessoa);

        return {
            principal: this._service.novo(entidade),
            acao: 'Novo',
            apoio: [
                this._unidadeMedidaService.lista,
            ],
        };
    }

}
