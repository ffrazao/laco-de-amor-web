import { Injectable } from '@angular/core';
import { Vender } from './vender';
import { VenderFiltro } from './vender-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class VenderService extends ServicoCrudService<Vender, VenderFiltro> {

  constructor() {
    super('acao/vender');
  }

}
