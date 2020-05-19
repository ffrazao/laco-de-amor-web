import { Injectable } from '@angular/core';

import { Produzir } from '../../comum/modelo/entidade/produzir';
import { ProduzirFiltroDTO } from '../../comum/modelo/dto/produzir.filtro.dto';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/produzir.json';


@Injectable()
export class ProduzirService extends ServicoCrudService<Produzir, ProduzirFiltroDTO> {

  constructor() {
    super('acao/produzir');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new ProduzirFiltroDTO();
  }

}
