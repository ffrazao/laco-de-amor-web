import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ComprarCrudService } from '../comprar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { CotarCrudService } from '../../cotar/cotar.service';
import { EventoTipoCrudService } from '../../../cadastro/evento-tipo/evento-tipo.service';
import { hojeStr } from '../../../comum/ferramenta/ferramenta-comum';
import { Comprar } from 'src/app/comum/modelo/entidade/comprar';

@Injectable()
export class FormNovoResolve implements Resolve<any> {

    constructor(
        private _service: ComprarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _cotarService: CotarCrudService,
        private _eventoTipoService: EventoTipoCrudService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        const entidade = new Comprar();

        entidade.data = hojeStr();
        //entidade.eventoTipo = this._eventoTipoService.restore(2);

        return {
            principal: this._service.novo(entidade),
            acao: 'Novo',
            apoio: [
                this._unidadeMedidaService.lista,
                this._cotarService.lista,
            ],
        };
    }

}