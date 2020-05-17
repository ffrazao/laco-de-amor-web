import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../servico/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  public get estaLogado() {
    return this._localStorageService.estaLogado;
  }

}
