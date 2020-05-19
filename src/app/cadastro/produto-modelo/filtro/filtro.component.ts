import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { gerarFormulario } from '../../../comum/ferramenta/ferramenta-comum';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoModeloService } from '../produto-modelo.service';
import { ProdutoModeloFiltroDTO } from '../../../comum/modelo/dto/produto-modelo.filtro.dto';
import { ProdutoModelo } from 'src/app/comum/modelo/entidade/produto-modelo';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;
  public entidade: ProdutoModeloFiltroDTO;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: ProdutoModeloService,
    private router: Router) { }

  ngOnInit(): void {
    this.entidade = this.servico.filtro;
    this.frm = this.criarFormulario(this.entidade);
  }

  criarFormulario(entidade) {
    if (!entidade) {
      entidade = new ProdutoModelo();
    }
    const result = this.formBuilder.group(
      {
        nome: [entidade.nome, []],
        codigo: [entidade.codigo, []],
        materiaPrima: [entidade.materiaPrima, []],
      }
    );
    return result;
  }

  public enviar() {
    this.isEnviado = true;
    this.entidade = this.frm.value;
    this.servico.filtro = this.entidade;

    this.router.navigate(['cadastro', 'produto-modelo']);
  }

}
