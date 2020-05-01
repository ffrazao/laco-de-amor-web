import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoTipo } from '../../comum/entidade/modelo/evento-tipo';
import { Filtro } from '../../comum/entidade/filtro/filtro';

import json from '../../json/evento-tipo.json';

@Injectable()
export class EventoTipoService extends ServicoCrudService<EventoTipo, Filtro> {

  constructor() {
    super('cadastro/evento-tipo');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
