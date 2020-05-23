import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoTipo } from '../../comum/modelo/entidade/evento-tipo';
import { EventoTipoFiltroDTO } from './../../comum/modelo/dto/evento-tipo.filtro.dto';

@Injectable()
export class EventoTipoCrudService extends ServicoCrudService<EventoTipo, EventoTipoFiltroDTO> {

  constructor() {
    super('evento-tipo');

    this.filtro = new EventoTipoFiltroDTO();
  }

}
