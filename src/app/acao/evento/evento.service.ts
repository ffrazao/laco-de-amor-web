import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Evento } from '../../comum/modelo/entidade/evento';

import json from '../../json/evento.json';
import { EventoFiltroDTO } from 'src/app/comum/modelo/dto/evento.filtro.dto';

@Injectable()
export class EventoService extends ServicoCrudService<Evento, EventoFiltroDTO> {

  constructor() {
    super('cadastro/evento');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new EventoFiltroDTO();
  }

}
