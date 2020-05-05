import { Injectable } from '@angular/core';

import { Produzir } from '../../comum/entidade/modelo/produzir';
import { ProduzirFiltro } from '../../comum/entidade/filtro/produzir-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/produzir.json';
import { Filtro } from 'src/app/comum/entidade/filtro/filtro';


@Injectable()
export class ProduzirService extends ServicoCrudService<Produzir, ProduzirFiltro> {

  constructor() {
    super('acao/produzir');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
