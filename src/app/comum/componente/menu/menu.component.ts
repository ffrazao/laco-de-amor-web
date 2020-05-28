import { constante } from './../../constante';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../servico/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public SEM_FOTO = constante.SEM_FOTO;

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  public logout() {
    this._localStorageService.removeDadosLogin();
    this._router.navigate(['/']);
  }

  public adMime(v) {
    return this.adMime(v);
  }

  public get estaLogado() {
    return this._localStorageService.estaLogado;
  }

  public get login() {
    return this.estaLogado ? this._localStorageService.dadosLogin : null;
  }

}
