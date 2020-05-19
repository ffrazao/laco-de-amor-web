import { PessoaFiltroDTO } from '../modelo/dto/pessoa.filtro.dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injector, Type } from '@angular/core';

import { findIndexById } from '../ferramenta/ferramenta-comum';

import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { EntidadeId } from '../modelo/entidade-id';
import { FiltroDTO } from '../modelo/dto/filtro.dto';
import { InjetorEstaticoService } from './../../comum/servico/injetor-estatico.service';
import { Observable } from 'rxjs';

export abstract class ServicoCrudService<E extends EntidadeId, F extends FiltroDTO> {

  private _http: HttpClient;
  private _localStorageService: LocalStorageService;

  private _lista: E[];
  private _form: E;
  private _filtro: F;

  constructor(
    private _funcionalidade: string,
  ) {
    const injector: Injector = InjetorEstaticoService.injector;
    this._http = injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    this._localStorageService = injector.get<LocalStorageService>(LocalStorageService as Type<LocalStorageService>);
  }

  public get funcionalidade(): string {
    return this._funcionalidade;
  }

  public get lista(): E[] {
    return this._lista;
  }

  public get form(): E {
    return this._form;
  }

  public get filtro(): F {
    return this._filtro;
  }

  public set form(valor) {
    this._form = valor;
  }

  public set filtro(valor) {
    this._filtro = valor;
  }

  public create(entidade: E) {
    // environment.API_URL;
    if (entidade != null) {
      entidade.id = this.lista.length + 1;
      this.lista.push(entidade);
    }
  }

  public restore(id: number): E {
    let result: E = null;

    const idx = null; // findIndexById(this.lista, id as number);
    if (idx >= 0) {
      result = this.lista[idx];
    } else {
      throw new Error('Registro não encontrado ' + id);
    }

    return result;
  }

  public update(id: number, entidade: E): void {
    const result: E = null;

    const idx = null; // findIndexById(this.lista, id);
    if (idx >= 0) {
      this.lista[idx] = entidade;
    } else {
      throw new Error('Registro não encontrado ' + id);
    }
  }

  public delete(id: number) {
    const result: E = null;
    const idx = null; // findIndexById(this.lista, id);
    if (idx) {
      this.lista.splice(idx, 1);
    } else {
      throw new Error('Registro não encontrado ' + id);
    }
  }

  public novo() {
    return {} as E;
  }

  public get headerData() {
    const credentials = 'Bearer ' + this._localStorageService.token;
    const result = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: credentials
    };
    return new HttpHeaders(result);
  }

  public fitrar(): Observable<E[]> {
    // captar parametros do filtro
    let param = Object.keys(this.filtro).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(this.filtro[key])).join('&');
    if (param) {
      param = '?' + param;
    }
    return this._http.get<E[]>(`${environment.REST_API_URL}${this.funcionalidade}${param}`, { headers: this.headerData });
  }

}
