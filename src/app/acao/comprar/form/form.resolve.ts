import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { ComprarCrudService } from '../comprar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';
import { CotarCrudService } from '../../cotar/cotar.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(
        private _service: ComprarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        private _cotarService: CotarCrudService,
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