import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Utilizar } from '../../comum/modelo/entidade/utilizar';
import { UtilizarFiltroDTO } from '../../comum/modelo/dto/utilizar.filtro.dto';

@Injectable()
export class UtilizarCrudService extends ServicoCrudService<Utilizar, UtilizarFiltroDTO> {

  constructor() {
    super('utilizar');

    this.filtro = new UtilizarFiltroDTO();
  }

}

