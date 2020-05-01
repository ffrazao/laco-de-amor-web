import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoModeloFiltro } from '../../comum/entidade/filtro/produto-modelo-filtro';
import { ProdutoModelo } from '../../comum/entidade/modelo/produto-modelo';

import json from '../../json/produto-modelo.json';

@Injectable()
export class ProdutoModeloService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltro> {

  constructor() {
    super('produto-modelo');
    json.forEach(v => this.lista.push(v));

    this.filtro = new ProdutoModeloFiltro();
  }

}
