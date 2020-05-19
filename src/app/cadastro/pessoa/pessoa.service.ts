import { Injectable } from '@angular/core';

import { Pessoa } from '../../comum/modelo/entidade/pessoa';
import { PessoaFiltroDTO } from '../../comum/modelo/dto/pessoa.filtro.dto';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/pessoa.json';

@Injectable()
export class PessoaService extends ServicoCrudService<Pessoa, PessoaFiltroDTO> {

  constructor() {
    super('/pessoa');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new PessoaFiltroDTO();
  }

}
