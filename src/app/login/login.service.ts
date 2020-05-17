import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { TokenService } from '../comum/servico/token.service';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient, private _tokenService: TokenService) { }

  public login(login: string, senha: string) {
    let credentials = `Basic ${this.getClientCredentials()}`;
    credentials = 'Basic bGFjby1kZS1hbW9yOmxhY28tZGUtYW1vcg==';

    const formData: any = new FormData();
    // formData.append('grant_type', 'password');
    formData.append('username', login);
    formData.append('password', senha);
    formData.append('scope', 'read write');

    return this._http.post(
      environment.AUTHORIZATION_SERVER + `/oauth/token?grant_type=password&username=${login}&password=${senha}&scope=read write`, {
        // grant_type: 'password',
        username: login,
        password: senha,
        scope: 'read write'
      },
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          Authorization: credentials,
        }),
      }
    ).pipe(tap(resposta => {
      const resp = resposta.body;
      const token = resp['access_token'];
      if (!token) {
        const msg = 'Problemas ao autenticar o usuário!';
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
    }));

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
