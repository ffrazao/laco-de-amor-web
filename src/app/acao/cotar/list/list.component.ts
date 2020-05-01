import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Cotar } from '../../../comum/entidade/modelo/cotar';
import { EventoProduto } from 'src/app/comum/entidade/modelo/evento-produto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'Id'
  headElements = [
    'data', 'eventoProdutoList', 'eventoPessoaList', 'menorPreco', 'mediaPreco', 'maiorPreco'
  ];
  elements: Cotar[] = [];
  dataSource = new MatTableDataSource(this.elements);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((info) => {
      this.elements.length = 0;
      for (let i = 0; i < info.resolve.principal.length; i++) {
        this.elements.push(info.resolve.principal[i]);
      }
      this.dataSource = new MatTableDataSource(this.elements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  menorCotacao(c: Cotar) {
    return this.calcular(c).menor;
  }

  mediaCotacao(c: Cotar) {
    return this.calcular(c).media;
  }

  maiorCotacao(c: Cotar) {
    return this.calcular(c).maior;
  }

  calcular(c: Cotar): ResultadoCotacao {
    let menor = 0;
    let media = 0;
    let maior = 0;
    if (c.eventoPessoaList && c.eventoPessoaList.length) {
      let totalGeral = 0;
      for (let i = 0; i < c.eventoPessoaList.length; i++) {
        let total = 0;
        if (c.eventoPessoaList[i].eventoProdutoList && c.eventoPessoaList[i].eventoProdutoList.length) {
          for (let j = 0; j < c.eventoPessoaList[i].eventoProdutoList.length; j++) {
            let p: EventoProduto = c.eventoPessoaList[i].eventoProdutoList[j];
            total += p.quantidade * p.valorUnitario;
          }
        }
        if (i === 0) {
          menor = total;
          maior = total;
        } else {
          menor = menor < total ? menor: total;
          maior = total > maior ? total : maior;
        }
        totalGeral += total;
      }
      media = totalGeral / c.eventoPessoaList.length;
    }
    return {
      menor,
      media,
      maior,
    };
  }

}

class ResultadoCotacao {
  menor: number = 0;
  media: number = 0;
  maior: number = 0;
}
