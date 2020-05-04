import { Injectable } from '@angular/core';

import { Comprar } from '../../comum/entidade/modelo/comprar';
import { ComprarFiltro } from '../../comum/entidade/filtro/comprar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/comprar.json';
import { Filtro } from 'src/app/comum/entidade/filtro/filtro';


@Injectable()
export class ComprarService extends ServicoCrudService<Comprar, ComprarFiltro> {

  constructor() {
    super('acao/comprar');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
