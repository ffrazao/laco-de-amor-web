import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { EventoTipo } from '../../comum/entidade/modelo/evento-tipo';
import { Filtro } from '../../comum/entidade/filtro/filtro';

@Injectable({
  providedIn: 'root'
})
export class EventoTipoService extends ServicoCrudService<EventoTipo, Filtro> {

  constructor() {
    super('cadastro/evento-tipo');
    this.lista.push({ id: 1, nome: 'Cotar', codigo: 'COTAR' });
    this.lista.push({ id: 2, nome: 'Comprar', codigo: 'COMPRAR' });
    this.lista.push({ id: 3, nome: 'Produzir', codigo: 'PRODUZIR' });
    this.lista.push({ id: 4, nome: 'Vender', codigo: 'VENDER' });

    this.filtro = new Filtro();
  }

}
