import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { ComprarCrudService } from './../comprar.service';
import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { EventoProduto } from 'src/app/comum/modelo/entidade/evento-produto';
import { constante } from '../../../comum/constante';
import { adMime } from 'src/app/comum/ferramenta/ferramenta-comum';
import { EventoPessoa } from 'src/app/comum/modelo/entidade/evento-pessoa';
import { ComprarFormService } from '../comprar-form.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public prod = environment.production;

  public headElements = [
    'data',
    'eventoProdutoList'
  ];

  public dataSource: MatTableDataSource<Comprar>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  constructor(
    private _service: ComprarCrudService,
    private _formService: ComprarFormService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Comprar[]) => {
        this._service.lista.length = 0;
        p.forEach((r: Comprar) => {
          if (r.eventoProdutoList) {
            r.eventoProdutoList.forEach((ep: EventoProduto) => {
              if (ep.produto.produtoModelo.foto) {
                ep.produto.produtoModelo.foto = adMime(ep.produto.produtoModelo.foto);
              }
            });
          }
          if (r.eventoPessoaList) {
            r.eventoPessoaList.forEach((ep: EventoPessoa) => {
              if (ep.eventoProdutoList) {
                ep.eventoProdutoList.forEach((ep1: EventoProduto) => {
                  if (ep1.produto.produtoModelo.foto) {
                    ep1.produto.produtoModelo.foto = adMime(ep1.produto.produtoModelo.foto);
                  }
                });
              }
            });
          }
          r.eventoProdutoListTotal = this._formService.calculaOrcamento(r.eventoProdutoList);
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
