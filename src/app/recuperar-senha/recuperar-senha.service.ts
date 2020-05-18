import { RecuperarSenha } from './../comum/modelo/recuperar-senha';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from '../comum/servico/local-storage.service';

@Injectable()
export class RecuperarSenhaService {

  constructor(
    private _http: HttpClient
  ) {
  }

  public recuperarSenha(valor: RecuperarSenha) {
    return this._http.post(environment.AUTHORIZATION_SERVER + `/usuario/recuperar-senha`, valor);
  }

}
