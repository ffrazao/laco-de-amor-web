import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { CotarCrudService } from '../cotar.service';
import { CotarFormService } from '../cotar-form.service';
import { Cotar } from '../../../comum/modelo/entidade/cotar';
import { EventoProduto } from 'src/app/comum/modelo/entidade/evento-produto';
import { constante } from './../../../comum/constante';
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
    'eventoProdutoList',
    'eventoPessoaList',
    'menorPreco',
    'mediaPreco',
    'maiorPreco'
  ];

  public dataSource: MatTableDataSource<Cotar>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  constructor(
    private _service: CotarCrudService,
    private _formService: CotarFormService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Cotar[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Cotar) => {
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

  public aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  menorCotacao(c: Cotar) {
    return this._formService.calcularValoresCotacao(c).menor;
  }

  mediaCotacao(c: Cotar) {
    return this._formService.calcularValoresCotacao(c).media;
  }

  maiorCotacao(c: Cotar) {
    return this._formService.calcularValoresCotacao(c).maior;
  }

}
