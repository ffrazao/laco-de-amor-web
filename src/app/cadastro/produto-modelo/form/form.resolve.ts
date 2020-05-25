import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProdutoModeloCrudService } from '../produto-modelo.service';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';

@Injectable()
export class FormResolve implements Resolve<ProdutoModelo> {

    constructor(private _service: ProdutoModeloCrudService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        return {
            principal: this._service.restore(route.params.id),
            acao: 'Visualizar'
        };
    }

}
