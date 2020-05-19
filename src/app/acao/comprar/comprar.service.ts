import { Injectable } from '@angular/core';

import { Comprar } from '../../comum/modelo/entidade/comprar';
import { ComprarFiltroDTO } from '../../comum/modelo/dto/comprar.filtro.dto';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/comprar.json';
import { FiltroDTO } from '../../comum/modelo/dto/filtro.dto';


@Injectable()
export class ComprarService extends ServicoCrudService<Comprar, ComprarFiltroDTO> {

  constructor() {
    super('acao/comprar');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new ComprarFiltroDTO();
  }

}
