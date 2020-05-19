import { Injectable } from '@angular/core';

import { Utilizar } from '../../comum/modelo/entidade/utilizar';
import { UtilizarFiltroDTO } from '../../comum/modelo/dto/utilizar.filtro.dto';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/utilizar.json';

@Injectable()
export class UtilizarService extends ServicoCrudService<Utilizar, UtilizarFiltroDTO> {

  constructor() {
    super('acao/utilizar');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new UtilizarFiltroDTO();
  }

}
