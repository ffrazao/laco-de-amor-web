import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { Filtro } from '../../comum/modelo/filtro/filtro';

import json from '../../json/evento.json';

@Injectable()
export class EventoService extends ServicoCrudService<Evento, Filtro> {

  constructor() {
    super('cadastro/evento');
    json.forEach(v => this.lista.push(v));

    this.filtro = new Filtro();
  }

}
