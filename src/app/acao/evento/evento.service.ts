import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { EventoFiltroDTO } from 'src/app/comum/modelo/dto/evento.filtro.dto';

@Injectable()
export class EventoCrudService extends ServicoCrudService<Evento, EventoFiltroDTO> {

  constructor() {
    super('evento');

    this.filtro = new EventoFiltroDTO();
  }

}
