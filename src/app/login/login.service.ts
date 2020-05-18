import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from '../comum/servico/local-storage.service';
import { Login } from '../comum/modelo/login';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient, private _localStorageService: LocalStorageService) { }

  public login(valor: Login) {
    const credentials = `Basic ${this.getClientCredentials()}`;

    return this._http.post(
      environment.AUTHORIZATION_SERVER +
      `/oauth/token?grant_type=password&username=${valor.login}&password=${valor.senha}&scope=read write`,
      null,
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: credentials,
        }),
      }
    ).pipe(tap(resposta => {
      const resp = resposta.body;

      if (!resp || !resp['access_token']) {
        const msg = 'Problemas ao autenticar o usuário!';
        this._localStorageService.removeDadosLogin();
        throw new Error(msg);
      }

      this._localStorageService.dadosLogin = resp;
    }));

  }

  public logout() {
    this._localStorageService.removeDadosLogin();
  }

  public dadosLogin() {
    return this._localStorageService.dadosLogin;
  }

  public estaLogado() {
    return this._localStorageService.estaLogado;
  }

  private getClientCredentials() {
    return btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`);
  }

}
