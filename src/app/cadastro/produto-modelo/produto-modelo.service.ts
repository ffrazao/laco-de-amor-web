import { Injectable } from '@angular/core';

import { ServicoCrudService } from '../../comum/servico/servico-crud.service';
import { ProdutoModelo } from '../../comum/modelo/entidade/produto-modelo';
import { ProdutoModeloFiltroDTO } from '../../comum/modelo/dto/produto-modelo.filtro.dto';
import { environment } from '../../../environments/environment';
import { ImagemVendaDTO } from '../../comum/modelo/dto/imagem-venda.dto';


@Injectable()
export class ProdutoModeloCrudService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltroDTO> {

  constructor() {
    super('produto-modelo');

    this.filtro = new ProdutoModeloFiltroDTO();
  }

  public getImagemVenda() {
    return this.http.get<ImagemVendaDTO[]>(`${environment.REST_API_URL}/${this.funcionalidade}/imagem-venda`);
  }
}
