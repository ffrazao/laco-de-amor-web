import { Injector, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { EntidadeId } from '../modelo/entidade-id';
import { FiltroDTO } from '../modelo/dto/filtro.dto';
import { InjetorEstaticoService } from './../../comum/servico/injetor-estatico.service';

export abstract class ServicoCrudService<E extends EntidadeId, F extends FiltroDTO> {

  private _http: HttpClient;
  private _localStorageService: LocalStorageService;

  private _lista: E[] = [];
  private _form: E;
  private _filtro: F;

  private _acao = '';
  private _entidade: E;

  constructor(
    private _funcionalidade: string,
  ) {
    const injector: Injector = InjetorEstaticoService.injector;
    this._http = injector.get<HttpClient>(HttpClient as Type<HttpClient>);
    this._localStorageService = injector.get<LocalStorageService>(LocalStorageService as Type<LocalStorageService>);
  }

  private get headerData() {
    const credentials = 'Bearer ' + this._localStorageService.token;
    const result = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: credentials
    };
    return new HttpHeaders(result);
  }

  public get funcionalidade(): string {
    return this._funcionalidade;
  }

  public get acao(): string {
    return this._acao;
  }

  public get entidade(): E {
    return this._entidade;
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

  public set acao(valor: string) {
    this._acao = valor;
  }

  public set entidade(valor: E) {
    this._entidade = valor;
  }

  public create(entidade: E): Observable<number>  {
    entidade.id = null;
    return this._http.post<number>(`${environment.REST_API_URL}${this.funcionalidade}`, entidade, { headers: this.headerData });
  }

  public restore(id: number): Observable<E> {
    return this._http.get<E>(`${environment.REST_API_URL}${this.funcionalidade}/${id}`, { headers: this.headerData });
  }

  public update(id: number, entidade: E): Observable<void> {
    return this._http.put<void>(`${environment.REST_API_URL}${this.funcionalidade}/${id}`, entidade, { headers: this.headerData });
  }

  public delete(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.REST_API_URL}${this.funcionalidade}/${id}`, { headers: this.headerData });
  }

  public novo(modelo: E): Observable<E> {
    return this._http.post<E>(`${environment.REST_API_URL}${this.funcionalidade}/novo`, modelo, { headers: this.headerData });
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
