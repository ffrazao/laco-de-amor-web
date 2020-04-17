import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public hasToken() {
    return this.getToken() != null;
  }

  public setToken(token) {
    localStorage.setItem(KEY, token);
  }

  public getToken() {
    return localStorage.getItem(KEY);
  }

  public removeToken() {
    return localStorage.removeItem(KEY);
  }

}
