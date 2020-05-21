import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Produzir } from '../../comum/modelo/entidade/produzir';
import { ProduzirFiltroDTO } from '../../comum/modelo/dto/produzir.filtro.dto';

@Injectable()
export class ProduzirCrudService extends ServicoCrudService<Produzir, ProduzirFiltroDTO> {

  constructor() {
    super('acao/produzir');

    this.filtro = new ProduzirFiltroDTO();
  }

}
