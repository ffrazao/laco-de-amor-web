import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Cotar } from '../../comum/modelo/entidade/cotar';
import { CotarFiltroDTO } from '../../comum/modelo/dto/cotar.filtro.dto';

@Injectable()
export class CotarCrudService extends ServicoCrudService<Cotar, CotarFiltroDTO> {

  constructor() {
    super('cotar');

    this.filtro = new CotarFiltroDTO();
  }

}

