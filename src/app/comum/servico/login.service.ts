import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private _tokenService: TokenService) { }

  public login(cpf: string, senha: string) {
    const credentials = `Basic ${this.getClientCredentials()}`;

    return this._http.post(
      environment.AUTHORIZATION_SERVER + '/oauth/token', {},
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': credentials
        }),
        params: {
          'grant_type': 'password',
          'username': cpf,
          'password': senha
        }
      }
    ).pipe(tap(resposta => {
      let resp = resposta.body;
      let token = resp['access_token'];
      if (!token) {
        let msg = 'Problemas ao autenticar o usuário!';
        throw new Error(msg);
      }
      this._tokenService.setToken(token);
      /*
      this._http.get(environment.REST_API_URL + '/usuario', {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`
        })
      })
        .subscribe((resposta) => {
          //this._usuarioService.login((resposta.body as Usuario));
        }, err => alert('Erro get usuario ' + JSON.stringify(err)));*/
    }))
  }

  public logout() {
    this._tokenService.removeToken();
  }

  public usuario() {

  }

  public estaLogado() {
    return this._tokenService.hasToken();
  }

  private getClientCredentials() {
    return btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`);
  }

}
