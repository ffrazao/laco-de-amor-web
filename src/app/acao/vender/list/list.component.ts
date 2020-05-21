import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Vender } from '../../../comum/modelo/entidade/vender';
import { constante } from '../../../comum/constante';
import { VenderCrudService } from '../vender.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'Id'
  public headElements = [
    'data',
    'nome',
    'cpfCnpj',
    'eventoProdutoList'
  ];

  public dataSource: MatTableDataSource<Vender>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  constructor(
    private _service: VenderCrudService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Vender[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Vender) => this._service.lista.push(r));
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public maximoLinhas(l: number, t: number) {
    return l < t;
  }

}
