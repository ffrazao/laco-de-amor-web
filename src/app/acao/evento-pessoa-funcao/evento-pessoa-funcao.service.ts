import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoPessoaFuncao } from '../../comum/modelo/entidade/evento-pessoa-funcao';
import { EventoPessoaFuncaoFiltroDTO } from 'src/app/comum/modelo/dto/evento-pessoa-funcao.filtro.dto';

@Injectable({providedIn: 'root'})
export class EventoPessoaFuncaoCrudService extends ServicoCrudService<EventoPessoaFuncao, EventoPessoaFuncaoFiltroDTO> {

  constructor() {
    super('evento-pessoa-funcao');

    this.filtro = new EventoPessoaFuncaoFiltroDTO();
  }

}
