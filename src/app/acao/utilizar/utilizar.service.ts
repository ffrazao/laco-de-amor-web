import { Injectable } from '@angular/core';

import { Utilizar } from '../../comum/entidade/modelo/utilizar';
import { UtilizarFiltro } from '../../comum/entidade/filtro/utilizar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/utilizar.json';
import { Filtro } from 'src/app/comum/entidade/filtro/filtro';


@Injectable()
export class UtilizarService extends ServicoCrudService<Utilizar, UtilizarFiltro> {

  constructor() {
    super('acao/utilizar');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
