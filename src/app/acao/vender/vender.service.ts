import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Vender } from '../../comum/modelo/entidade/vender';
import { VenderFiltroDTO } from '../../comum/modelo/dto/vender.filtro.dto';

@Injectable()
export class VenderCrudService extends ServicoCrudService<Vender, VenderFiltroDTO> {

  constructor() {
    super('acao/vender');

    this.filtro = new VenderFiltroDTO();
  }

}
