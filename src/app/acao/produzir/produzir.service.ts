import { Injectable } from '@angular/core';

import { Produzir } from '../../comum/modelo/entidade/produzir';
import { ProduzirFiltro } from '../../comum/modelo/filtro/produzir-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/produzir.json';
import { Filtro } from '../../comum/modelo/filtro/filtro';


@Injectable()
export class ProduzirService extends ServicoCrudService<Produzir, ProduzirFiltro> {

  constructor() {
    super('acao/produzir');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
