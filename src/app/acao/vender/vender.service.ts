import { Injectable } from '@angular/core';

import { Vender } from '../../comum/modelo/entidade/vender';
import { VenderFiltro } from '../../comum/modelo/filtro/vender-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/vender.json';
import { Filtro } from '../../comum/modelo/filtro/filtro';


@Injectable()
export class VenderService extends ServicoCrudService<Vender, VenderFiltro> {

  constructor() {
    super('acao/vender');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
