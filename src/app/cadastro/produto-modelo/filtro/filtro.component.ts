import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutoModeloCrudService } from '../produto-modelo.service';
import { ProdutoModeloFormService } from '../produto-modelo-form.service';
import { ProdutoModeloFiltroDTO } from '../../../comum/modelo/dto/produto-modelo.filtro.dto';
import { deEnumParaChaveValor } from 'src/app/comum/ferramenta/ferramenta-comum';
import { Confirmacao } from '../../../comum/modelo/dominio/confirmacao';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup;
  public isEnviado = false;

  public confirmacaoList: any;

  constructor(
    private _service: ProdutoModeloCrudService,
    private _formService: ProdutoModeloFormService,
    private router: Router,
  ) {
    this.confirmacaoList = deEnumParaChaveValor(Confirmacao);
  }

  ngOnInit(): void {
    this.carregar(this._service.filtro);
  }

  public enviar() {
    this.isEnviado = true;
    this._service.filtro = this.frm.value;

    this.router.navigate(['cadastro', this._service.funcionalidade]);
  }

  public carregar(f: ProdutoModeloFiltroDTO) {
    if (!f) {
      f = new ProdutoModeloFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

  public exibeConfirmacao(v: Confirmacao) {
    if (!v) {
      return '';
    }
    const result = this.confirmacaoList.filter((i: { chave: string, valor: string }) => i.chave === v);
    return result ? result[0].valor : '';
  }

}
