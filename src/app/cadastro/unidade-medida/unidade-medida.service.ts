import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { UnidadeMedida } from '../../comum/entidade/modelo/unidade-medida';
import { Filtro } from '../../comum/entidade/filtro/filtro';
import { Confirmacao } from '../../comum/dominio/confirmacao';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService extends ServicoCrudService<UnidadeMedida, Filtro> {

  constructor() {
    super('cadastro/unidade-medida');
    this.lista.push({id: 1, nome: 'Metro', codigo: 'METRO', base: Confirmacao.S, valorBase: 1, pai: null});

    this.filtro = new Filtro();
  }

}
