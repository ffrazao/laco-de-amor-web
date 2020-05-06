import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { VenderService } from '../vender.service';
import { UnidadeMedidaService } from '../../../cadastro/unidade-medida/unidade-medida.service';

@Injectable()
export class FormResolve implements Resolve<any> {

    constructor(
        private _service: VenderService,
        private _unidadeMedidaService: UnidadeMedidaService,
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