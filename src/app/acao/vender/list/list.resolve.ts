import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Vender } from '../../../comum/entidade/modelo/vender';
import { VenderService } from '../vender.service';

@Injectable()
export class ListResolve implements Resolve<any> {

    constructor(private servico: VenderService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        let list = this.servico.fitrar();
        return { principal: list };
    }

}