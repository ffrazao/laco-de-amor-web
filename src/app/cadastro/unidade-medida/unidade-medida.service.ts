import { UnidadeMedidaFiltroDTO } from './../../comum/modelo/dto/unidade-medida.filtro.dto';
import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { UnidadeMedida } from '../../comum/modelo/entidade/unidade-medida';

import json from '../../json/unidade-medida.json';

@Injectable()
export class UnidadeMedidaService extends ServicoCrudService<UnidadeMedida, UnidadeMedidaFiltroDTO> {

  constructor() {
    super('cadastro/unidade-medida');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new UnidadeMedidaFiltroDTO();
  }

}
