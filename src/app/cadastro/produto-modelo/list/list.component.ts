import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { ProdutoModeloCrudService } from '../produto-modelo.service';
import { constante } from '../../../comum/constante';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'Foto', 'Nome', 'Código', 'Matéria Prima'
  public headElements = [
    'foto',
    'nome',
    'codigo',
    'materiaPrima',
  ];

  public dataSource: MatTableDataSource<ProdutoModelo>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  constructor(
    private _service: ProdutoModeloCrudService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: ProdutoModelo[]) => {
        this._service.lista.length = 0;
        p.forEach((r: ProdutoModelo) => this._service.lista.push(r));
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
