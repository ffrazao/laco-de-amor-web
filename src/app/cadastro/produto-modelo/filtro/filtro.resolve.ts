import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProdutoModeloCrudService } from '../produto-modelo.service';

@Injectable()
export class FiltroResolve implements Resolve<any> {

    constructor(private _service: ProdutoModeloCrudService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any | Observable<any> | Promise<any> {

        this._service.acao = 'Filtrar';

        return null;

    }

}
