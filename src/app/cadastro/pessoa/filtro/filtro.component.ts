import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { gerarFormulario } from '../../../comum/ferramenta/ferramenta-comum';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { PessoaFiltroDTO } from '../../../comum/modelo/dto/pessoa.filtro.dto';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;
  public entidade: PessoaFiltroDTO;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: PessoaService,
    private router: Router) { }

  ngOnInit(): void {
    this.entidade = this.servico.filtro;
    this.frm = this.criarFormulario(this.entidade);
  }

  criarFormulario(entidade) {
    const result = this.formBuilder.group(
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
    this.entidade = this.frm.value;
    this.servico.filtro = this.entidade;

    this.router.navigate(['cadastro', 'pessoa']);
  }

}
