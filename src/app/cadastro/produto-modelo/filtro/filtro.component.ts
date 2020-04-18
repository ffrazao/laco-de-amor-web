import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { gerarFormulario } from '../../../comum/ferramenta/ferramenta';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoModeloService } from '../produto-modelo.service';
import { ProdutoModeloFiltro } from '../produto-modelo-filtro';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;
  public entidade: ProdutoModeloFiltro;

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
      entidade = new ProdutoModeloFiltro;
    }
    let result = this.formBuilder.group(
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
