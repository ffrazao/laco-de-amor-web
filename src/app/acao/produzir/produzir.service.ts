import { Injectable } from '@angular/core';
import { Produzir } from '../../comum/entidade/modelo/produzir';
import { ProduzirFiltro } from '../../comum/entidade/filtro/produzir-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProduzirService extends ServicoCrudService<Produzir, ProduzirFiltro> {

  constructor() {
    super('acao/produzir');
  }

}
