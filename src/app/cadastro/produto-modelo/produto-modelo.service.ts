import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoModelo } from '../../comum/modelo/entidade/produto-modelo';
import { ProdutoModeloFiltroDTO } from '../../comum/modelo/dto/produto-modelo.filtro.dto';

@Injectable()
export class ProdutoModeloCrudService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltroDTO> {

  constructor() {
    super('produto-modelo');

    this.filtro = new ProdutoModeloFiltroDTO();
  }

}
