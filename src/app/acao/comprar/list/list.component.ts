import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { ComprarCrudService } from './../comprar.service';
import { constante } from '../../../comum/constante';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'data', 'eventoProdutoList'
  public headElements = [
    'data',
    'eventoProdutoList'
  ];

  public dataSource: MatTableDataSource<Comprar>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  constructor(
    private _service: ComprarCrudService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Comprar[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Comprar) => this._service.lista.push(r));
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
