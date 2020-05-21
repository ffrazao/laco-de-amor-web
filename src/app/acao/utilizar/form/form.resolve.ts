import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UtilizarCrudService } from '../utilizar.service';
import { UnidadeMedidaCrudService } from '../../../cadastro/unidade-medida/unidade-medida.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(
        private _service: UtilizarCrudService,
        private _unidadeMedidaService: UnidadeMedidaCrudService,
        ) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
            let entidade = this._service.restore(route.params['id']);
            return {
                principal: entidade,
                acao: 'Visualizar',
                apoio: [
                    this._unidadeMedidaService.lista,
                    ],
            };
        }

}