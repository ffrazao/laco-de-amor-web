import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ProdutoModeloCrudService } from '../produto-modelo.service';

@Injectable()
export class FiltroResolve implements Resolve<any> {

    constructor(private servico: ProdutoModeloCrudService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        return null;
    }

}