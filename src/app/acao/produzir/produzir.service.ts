import { Injectable } from '@angular/core';
import { Produzir } from './produzir';
import { ProduzirFiltro } from './produzir-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProduzirService extends ServicoCrudService<Produzir, ProduzirFiltro> {

  constructor() {
    super('acao/produzir');
  }

}
