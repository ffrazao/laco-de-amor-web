import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { UnidadeMedida } from '../../comum/entidade/modelo/unidade-medida';
import { Filtro } from '../../comum/entidade/filtro/filtro';

import json from '../../json/unidade-medida.json';

@Injectable()
export class UnidadeMedidaService extends ServicoCrudService<UnidadeMedida, Filtro> {

  constructor() {
    super('cadastro/unidade-medida');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
