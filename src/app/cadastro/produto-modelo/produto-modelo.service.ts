import { Injectable } from '@angular/core';
import { ServicoCrudService } from 'src/app/comum/servico/servico-crud.service';
import { ProdutoModelo } from './produto-modelo';
import { ProdutoModeloFiltro } from './produto-modelo-filtro';
import { ProdutoDescricao } from './produto-descricao';

@Injectable({
  providedIn: 'root'
})
export class ProdutoModeloService extends ServicoCrudService<ProdutoModelo, ProdutoModeloFiltro> {

  constructor() {
    super('produto-modelo');
    this.lista.push(
      {
        id: 1, nome: 'Pano 1', codigo: 'PN1', materiaPrima: 'S', foto: null,
        produtoDescricaoList: [
          {
            id: 1,
            produtoAtributo: { id: 1, nome: 'Tamanho' },
            valor: '40 metros',
            ordem: 1
          } as ProdutoDescricao,
          {
            id: 2,
            produtoAtributo: { id: 2, nome: 'Estampa' },
            valor: 'Lisa',
            ordem: 2
          } as ProdutoDescricao
        ]
      },
      {
        id: 2, nome: 'Pano 2', codigo: 'PN2', materiaPrima: 'S', foto: null,
        produtoDescricaoList: [
          {
            id: 3,
            produtoAtributo: { id: 1, nome: 'Tamanho' },
            valor: '60 metros',
            ordem: 1
          } as ProdutoDescricao,
          {
            id: 4,
            produtoAtributo: { id: 2, nome: 'Estampa' },
            valor: 'Sem estampa',
            ordem: 2
          } as ProdutoDescricao,
          {
            id: 5,
            produtoAtributo: { id: 3, nome: 'Cor' },
            valor: 'Bege',
            ordem: 3
          } as ProdutoDescricao
        ]
      },
      {
        id: 1, nome: 'Máscara Reta', codigo: 'MR1', materiaPrima: 'N', foto: null,
        produtoDescricaoList: [
          {
            id: 6,
            produtoAtributo: { id: 1, nome: 'Tamanho' },
            valor: 'P',
            ordem: 1
          } as ProdutoDescricao,
          {
            id: 7,
            produtoAtributo: { id: 2, nome: 'Estampa' },
            valor: 'Lisa',
            ordem: 2
          } as ProdutoDescricao
        ]
      },
      {
        id: 1, nome: 'Máscara Bico de Pato', codigo: 'MBP1', materiaPrima: 'N', foto: null,
        produtoDescricaoList: [
          {
            id: 6,
            produtoAtributo: { id: 1, nome: 'Tamanho' },
            valor: 'P',
            ordem: 1
          } as ProdutoDescricao,
          {
            id: 7,
            produtoAtributo: { id: 2, nome: 'Estampa' },
            valor: 'Escura',
            ordem: 2
          } as ProdutoDescricao
        ]
      },
    );
    this.filtro = new ProdutoModeloFiltro();
  }

}
