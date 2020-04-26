import { Injectable } from '@angular/core';
import { Cotar } from '../../comum/entidade/modelo/cotar';
import { CotarFiltro } from '../../comum/entidade/filtro/cotar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CotarService extends ServicoCrudService<Cotar, CotarFiltro> {

  constructor() {
    super('acao/cotar');
  }
}
