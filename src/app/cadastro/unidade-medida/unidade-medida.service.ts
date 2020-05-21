import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { UnidadeMedida } from '../../comum/modelo/entidade/unidade-medida';
import { UnidadeMedidaFiltroDTO } from './../../comum/modelo/dto/unidade-medida.filtro.dto';

@Injectable()
export class UnidadeMedidaCrudService extends ServicoCrudService<UnidadeMedida, UnidadeMedidaFiltroDTO> {

  constructor() {
    super('cadastro/unidade-medida');

    this.filtro = new UnidadeMedidaFiltroDTO();
  }

}
