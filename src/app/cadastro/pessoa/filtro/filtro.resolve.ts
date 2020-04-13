import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PessoaService } from '../pessoa.service';

@Injectable()
export class FiltroResolve implements Resolve<any> {

    constructor(private servico: PessoaService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any | Observable<any> | Promise<any> {
        return null;
    }

}