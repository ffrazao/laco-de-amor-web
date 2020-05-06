import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoPessoaFuncao } from '../../comum/modelo/entidade/evento-pessoa-funcao';
import { Filtro } from '../../comum/modelo/filtro/filtro';

import json from '../../json/evento-pessoa-funcao.json';

@Injectable()
export class EventoPessoaFuncaoService extends ServicoCrudService<EventoPessoaFuncao, Filtro> {

  constructor() {
    super('cadastro/evento-pessoa-funcao');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
