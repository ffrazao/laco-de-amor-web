import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Comprar } from '../../comum/modelo/entidade/comprar';
import { ComprarFiltroDTO } from '../../comum/modelo/dto/comprar.filtro.dto';

@Injectable()
export class ComprarCrudService extends ServicoCrudService<Comprar, ComprarFiltroDTO> {

  constructor() {
    super('comprar');

    this.filtro = new ComprarFiltroDTO();
  }

}
