import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoAtributo } from '../../comum/modelo/entidade/produto-atributo';
import { FiltroDTO } from '../../comum/modelo/dto/filtro.dto';

import json from '../../json/produto-atributo.json';
import { ProdutoAtributoFiltroDTO } from 'src/app/comum/modelo/dto/produto-atributo.filtro.dto';

@Injectable()
export class ProdutoAtributoService extends ServicoCrudService<ProdutoAtributo, FiltroDTO> {

  constructor() {
    super('cadastro/produto-atributo');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new ProdutoAtributoFiltroDTO();
  }

}
