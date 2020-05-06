import { Injectable } from '@angular/core';
import { Vender } from '../../comum/modelo/entidade/vender';
import { VenderFiltro } from '../../comum/modelo/filtro/vender-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable()
export class VenderService extends ServicoCrudService<Vender, VenderFiltro> {

  constructor() {
    super('acao/vender');
  }

}
