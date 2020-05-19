import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoTipo } from '../../comum/modelo/entidade/evento-tipo';
import { EventoTipoFiltroDTO } from './../../comum/modelo/dto/evento-tipo.filtro.dto';

import json from '../../json/evento-tipo.json';

@Injectable()
export class EventoTipoService extends ServicoCrudService<EventoTipo, EventoTipoFiltroDTO> {

  constructor() {
    super('cadastro/evento-tipo');
    // json.forEach(v => this.lista.push(v));

    this.filtro = new EventoTipoFiltroDTO();
  }

}
