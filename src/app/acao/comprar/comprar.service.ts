import { Injectable } from '@angular/core';
import { Comprar } from './comprar';
import { ComprarFiltro } from './comprar-filtro';
import { ServicoCrudService } from '../../comum/servico/servico-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ComprarService extends ServicoCrudService<Comprar, ComprarFiltro> {

  constructor() {
    super('acao/comprar');
  }

}
