import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoModeloFiltro } from '../../comum/modelo/filtro/produto-modelo-filtro';
import { ProdutoModelo } from '../../comum/modelo/entidade/produto-modelo';

import json from '../../json/produto-modelo.json';

@Injectable()
export class ProdutoModeloService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltro> {

  constructor() {
    super('produto-modelo');
    json.forEach(v => this.lista.push(v));

    this.filtro = new ProdutoModeloFiltro();
  }

}
