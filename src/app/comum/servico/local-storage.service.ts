import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _dadosLogin;

  constructor() {
  }

  public get estaLogado() {
    return localStorage.getItem(KEY) != null;
  }

  public set dadosLogin(dadosLogin) {
    localStorage.setItem(KEY, JSON.stringify(dadosLogin));
  }

  public get dadosLogin() {
    if (this.estaLogado) {
      this._dadosLogin = JSON.parse(localStorage.getItem(KEY));
      // this._dadosLogin.foto  = 'data:image/jpeg;base64,' + this._dadosLogin.foto;
    } else {
      this._dadosLogin = null;
    }
    return this._dadosLogin;
  }

  public get token() {
    if (!this.estaLogado) {
      throw new Error('Efetue o login!');
    }
    return this.dadosLogin.access_token;
  }

  public removeDadosLogin() {
    return localStorage.removeItem(KEY);
  }

}
