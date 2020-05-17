import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public get estaLogado() {
    return localStorage.getItem(KEY) != null;
  }

  public set dadosLogin(dadosLogin) {
    localStorage.setItem(KEY, JSON.stringify(dadosLogin));
  }

  public get dadosLogin() {
    return this.estaLogado ? JSON.parse(localStorage.getItem(KEY)) : null;
  }

  public get token() {
    if (!this.estaLogado) {
      throw new Error('Efetue o login!');
    }
    return this.dadosLogin['access_token'];
  }

  public removeDadosLogin() {
    return localStorage.removeItem(KEY);
  }

}
