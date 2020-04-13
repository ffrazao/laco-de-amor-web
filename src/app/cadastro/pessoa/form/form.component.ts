import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { gerarFormulario } from '../../../comum/ferramenta/ferramenta';
import { Pessoa } from '../pessoa';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { PessoaEndereco } from '../pessoa-endereco';
import { Endereco } from '../../endereco/endereco';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  isEnviado = false;
  public entidade: Pessoa;
  id: number;
  public acao: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: PessoaService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.id = p['id'];
    });
    this.route.data.subscribe((info) => {
      this.entidade = info.resolve.principal;
      this.acao = !info.resolve.acao ? 'Novo' : info.resolve.acao;
      this.form = this.criarFormulario(this.entidade);
      console.log(this.form);
    });
  }

  criarFormulario(entidade) {
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        tipo: [entidade.tipo, []],
        cpfCnpj: [entidade.cpfCnpj, []],
        nome: [entidade.nome, []],
        email: [entidade.email, []],
        contato1: [entidade.contato1, []],
        contato2: [entidade.contato2, []],
        contato3: [entidade.contato3, []],
        enderecoList: this.formBuilder.array([]).setValue(this.criarFormularioPessoaEndereco(entidade.enderecoList))
      }
    );

    return result;
  }

  criarFormularioPessoaEndereco(lista: PessoaEndereco[]) {
    let result = [];
    
    for (let i = 0; i < lista.length; i++) {
      let e = this.criarFormularioEndereco(lista[i].endereco);
      let r = this.formBuilder.group(
        {
          id: [lista[i].id, []],
          endereco: e,
        }
      );
      result.push(r);
    }
    return result;
  }

  criarFormularioEndereco(entidade: Endereco) {
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        logradouro: [entidade.logradouro, []],
        complemento: [entidade.complemento, []],
        numero: [entidade.numero, []],
        bairro: [entidade.bairro, []],
        cidade: [entidade.cidade, []],
        uf: [entidade.uf, []],
        cep: [entidade.cep, []],
      }
    );
    return result;
  }

  public enviar() {
    this.isEnviado = true;
    this.entidade = this.form.value;
    if ('Novo' === this.acao) {
      this.servico.create(this.entidade);
    } else {
      this.servico.update(this.id, this.entidade);
    }
    this.router.navigate(['cadastro', 'pessoa']);
  }

}
