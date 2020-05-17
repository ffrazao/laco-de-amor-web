import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from '../comum/servico/local-storage.service';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient, private _localStorageService: LocalStorageService) { }

  public login(login: string, senha: string) {
    let credentials = `Basic ${this.getClientCredentials()}`;
    // credentials = 'Basic ZGZfcnVyYWxfd2ViOmRmX3J1cmFsX3dlYg==';

    return this._http.post(
      environment.AUTHORIZATION_SERVER + `/oauth/token?grant_type=password&username=${login}&password=${senha}&scope=read write`, null,
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
