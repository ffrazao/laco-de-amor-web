import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { ProdutoModeloCrudService } from '../produto-modelo.service';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { constante } from '../../../comum/constante';
import { adMime, deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { Confirmacao } from '../../../comum/modelo/dominio/confirmacao';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public prod = environment.production;

  public headElements = [
    'foto',
    'nome',
    'codigo',
    'materiaPrima',
  ];

  public dataSource: MatTableDataSource<ProdutoModelo>;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public confirmacaoList: any;

  constructor(
    private _service: ProdutoModeloCrudService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.confirmacaoList = deEnumParaChaveValor(Confirmacao);
  }

  ngOnInit() {
    this._activatedRoute.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: ProdutoModelo[]) => {
        this._service.lista.length = 0;
        p.forEach((r: ProdutoModelo) => {
          r.foto = adMime(r.foto);
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

  public exibeConfirmacao(v: Confirmacao) {
    if (!v) {
      return '';
    }
    const result = this.confirmacaoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

}
