import { Injectable } from '@angular/core';

import { Vender } from '../../comum/modelo/entidade/vender';
import { VenderFiltroDTO } from '../../comum/modelo/dto/vender.filtro.dto';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/vender.json';


@Injectable()
export class VenderService extends ServicoCrudService<Vender, VenderFiltroDTO> {

  constructor() {
    super('acao/vender');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new VenderFiltroDTO();
  }

}
