import { EventoPessoaFuncaoService } from './../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { EventoPessoa } from './../../../comum/modelo/entidade/evento-pessoa';
import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { VenderService } from '../vender.service';
import { UnidadeMedidaService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { EventoTipoService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: VenderService,
        private _unidadeMedidaService: UnidadeMedidaService,
        private _eventoTipoService: EventoTipoService,
        private _eventoPessoaFuncaoService: EventoPessoaFuncaoService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let entidade = this._service.novo();

        entidade.data = hojeStr();
        entidade.eventoTipo = this._eventoTipoService.restore(2);
        let eventoPessoa = new EventoPessoa();
        eventoPessoa.eventoPessoaFuncao = this._eventoPessoaFuncaoService.lista[2];
        entidade.eventoPessoaList = [];
        entidade.eventoPessoaList.push(eventoPessoa);

        return {
            principal: entidade,
            acao: "Novo",
            apoio: [
                this._unidadeMedidaService.lista,
            ],
        };
    }

}