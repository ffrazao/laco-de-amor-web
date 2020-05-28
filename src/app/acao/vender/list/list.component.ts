import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { VenderCrudService } from '../vender.service';
import { Vender } from '../../../comum/modelo/entidade/vender';
import { EventoProduto } from 'src/app/comum/modelo/entidade/evento-produto';
import { constante } from '../../../comum/constante';
import { adMime } from 'src/app/comum/ferramenta/ferramenta-comum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public prod = environment.production;

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
        p.forEach((r: Vender) => {
          if (r.eventoProdutoList) {
            r.eventoProdutoList.forEach((ep: EventoProduto) =>
              ep.produto.produtoModelo.foto = adMime(ep.produto.produtoModelo.foto)
            );
          }
          this._service.lista.push(r);
        });
        this.dataSource = new MatTableDataSource(this._service.lista);
      });
    });
  }

  public adMime(v) {
    return adMime(v);
  }

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
