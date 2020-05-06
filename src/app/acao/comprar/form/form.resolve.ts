import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { ComprarService } from '../comprar.service';
import { UnidadeMedidaService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { CotarService } from '../../cotar/cotar.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(
        private _service: ComprarService,
        private _unidadeMedidaService: UnidadeMedidaService,
        private _cotarService: CotarService,
        ) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
            let entidade = this._service.restore(route.params['id']);
            return {
                principal: entidade,
                acao: 'Visualizar',
                apoio: [
                    this._unidadeMedidaService.lista,
                    this._cotarService.lista,
                    ],
            };
        }

}