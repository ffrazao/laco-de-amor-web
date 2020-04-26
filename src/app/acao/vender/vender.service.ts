import { Injectable } from '@angular/core';
import { Vender } from '../../comum/entidade/modelo/vender';
import { VenderFiltro } from '../../comum/entidade/filtro/vender-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class VenderService extends ServicoCrudService<Vender, VenderFiltro> {

  constructor() {
    super('acao/vender');
  }

}
