import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoPessoaFuncao } from '../../comum/modelo/entidade/evento-pessoa-funcao';

import json from '../../json/evento-pessoa-funcao.json';
import { EventoPessoaFuncaoFiltroDTO } from 'src/app/comum/modelo/dto/evento-pessoa-funcao.filtro.dto';

@Injectable({providedIn: 'root'})
export class EventoPessoaFuncaoService extends ServicoCrudService<EventoPessoaFuncao, EventoPessoaFuncaoFiltroDTO> {

  constructor() {
    super('cadastro/evento-pessoa-funcao');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new EventoPessoaFuncaoFiltroDTO();
  }

}
