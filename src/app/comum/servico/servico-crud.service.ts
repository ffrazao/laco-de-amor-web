import { HttpClient } from '@angular/common/http';

import { findIndexById } from '../ferramenta/ferramenta-comum';

import { environment } from '../../../environments/environment';
import { EntidadeId } from '../entidade/entidade-id';
import { Filtro } from '../entidade/filtro/filtro';

export abstract class ServicoCrudService<E extends EntidadeId, F extends Filtro> {

  private _http: HttpClient;
  private _lista: E[] = [];
  private _form: E;
  private _filtro: F;

  constructor(private _funcionalidade: string) { }

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
      entidade['id'] = this.lista.length + 1;
      this.lista.push(entidade);
    }
  }

  public restore(id: number): E {
    let result: E = null;

    let idx = findIndexById(this.lista, id as number);
    if (idx >= 0) {
      result = this.lista[idx];
    } else {
      throw new Error('Registro não encontrado ' + id);
    }

    return result;
  }

  public update(id: number, entidade: E): void {
    let result: E = null;

    let idx = findIndexById(this.lista, id);
    if (idx >= 0) {
      this.lista[idx] = entidade;
    } else {
      throw new Error('Registro não encontrado ' + id);
    }
  }

  public delete(id: number) {
    let result: E = null;
    let idx = findIndexById(this.lista, id);
    if (idx) {
      this.lista.splice(idx, 1);
    } else {
      throw new Error('Registro não encontrado ' + id);
    }
  }

  public novo() {
    return {} as E;
  }

  public fitrar() {
    if (!this.filtro || !this.lista || !this.lista.length) {
      return this.lista;
    }
    let camposFiltro = Object.getOwnPropertyNames(this.filtro);
    let camposRegistro = Object.getOwnPropertyNames(this.lista[0]);

    return this.lista.filter(reg => {
      let encontrado = true;
      for (let j = 0; j < camposRegistro.length; j++) {
        for (let i = 0; i < camposFiltro.length; i++) {
          if (encontrado
            && this.filtro[camposFiltro[j]]
            && reg[camposRegistro[i]]
            && camposFiltro[j] === camposRegistro[i]) {
            encontrado = this.filtro[camposFiltro[j]] === reg[camposRegistro[i]];
            break;
          }
        }
        if (!encontrado) {
          break;
        }
      }
      return encontrado;
    });
  }

}
