import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoAtributo } from '../../comum/modelo/entidade/produto-atributo';
import { ProdutoAtributoFiltroDTO } from 'src/app/comum/modelo/dto/produto-atributo.filtro.dto';

@Injectable()
export class ProdutoAtributoService extends ServicoCrudService<ProdutoAtributo, ProdutoAtributoFiltroDTO> {

  constructor() {
    super('produto-atributo');

    this.filtro = new ProdutoAtributoFiltroDTO();
  }

}
