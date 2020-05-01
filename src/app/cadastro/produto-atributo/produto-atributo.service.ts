import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoAtributo } from '../../comum/entidade/modelo/produto-atributo';
import { Filtro } from '../../comum/entidade/filtro/filtro';

import json from '../../json/produto-atributo.json';

@Injectable()
export class ProdutoAtributoService extends ServicoCrudService<ProdutoAtributo, Filtro> {

  constructor() {
    super('cadastro/produto-atributo');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
