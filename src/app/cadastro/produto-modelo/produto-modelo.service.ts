import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoModeloFiltroDTO } from '../../comum/modelo/dto/produto-modelo.filtro.dto';
import { ProdutoModelo } from '../../comum/modelo/entidade/produto-modelo';

import json from '../../json/produto-modelo.json';

@Injectable()
export class ProdutoModeloService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltroDTO> {

  constructor() {
    super('produto-modelo');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new ProdutoModeloFiltroDTO();
  }

}
