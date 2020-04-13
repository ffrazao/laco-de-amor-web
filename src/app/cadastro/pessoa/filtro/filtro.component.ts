import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { gerarFormulario } from '../../../comum/ferramenta/ferramenta';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { PessoaFiltro } from '../pessoa-filtro';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public form: FormGroup;
  isEnviado = false;
  public entidade: PessoaFiltro;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private servico: PessoaService,
    private router: Router) { }

  ngOnInit(): void {
      this.entidade = this.servico.filtro;
      this.form = this.criarFormulario(this.entidade);
  }

  criarFormulario(entidade) {
    let result = this.formBuilder.group(
      {
        tipo: [entidade.tipo, []],
        cpfCnpj: [entidade.cpfCnpj, []],
        nome: [entidade.nome, []],
      }
    );
    return result;
  }

  public enviar() {
    this.isEnviado = true;
    this.entidade = this.form.value;
    this.servico.filtro = this.entidade;
    
    this.router.navigate(['cadastro', 'pessoa']);
  }

}
