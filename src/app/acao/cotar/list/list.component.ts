import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Cotar } from '../../../comum/modelo/entidade/cotar';
import { CotarService } from '../cotar.service';

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

  constructor(private route: ActivatedRoute, private _servico: CotarService) { }

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
    return this._servico.calcularValoresCotacao(c).menor;
  }

  mediaCotacao(c: Cotar) {
    return this._servico.calcularValoresCotacao(c).media;
  }

  maiorCotacao(c: Cotar) {
    return this._servico.calcularValoresCotacao(c).maior;
  }

}

