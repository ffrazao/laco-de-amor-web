import { Injectable } from '@angular/core';
import { Cotar } from './cotar';
import { CotarFiltro } from './cotar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CotarService extends ServicoCrudService<Cotar, CotarFiltro> {

  constructor() {
    super('acao/cotar');
  }
}
