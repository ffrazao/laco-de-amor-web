import { Injectable } from '@angular/core';

import { Pessoa } from '../../comum/entidade/modelo/pessoa';
import { PessoaFiltro } from '../../comum/entidade/filtro/pessoa-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

import json from '../../json/pessoa.json';

@Injectable()
export class PessoaService extends ServicoCrudService<Pessoa, PessoaFiltro> {

  constructor() {
    super('cadastro/pessoa');
    json.forEach(v => this.lista.push(v));

    this.filtro = new PessoaFiltro();
  }

}
