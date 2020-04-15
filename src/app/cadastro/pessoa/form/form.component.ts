import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  
  public frm = this.criarFormulario(new Pessoa());
  
  isEnviado = false;
  public entidade: Pessoa;
  id: number;
  public acao: string;
  editar: boolean[];
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: PessoaService,
    private router: Router) { }
    
  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
      console.log('id', p, this.id);
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this.criarFormulario(this.entidade);
      console.log(this.frm);
    });
  }

  get enderecoList(): FormArray {
     return this.frm.get('enderecoList') as FormArray;
  }

  criarFormulario(entidade: Pessoa) {
    if (!entidade) {
      entidade = new Pessoa();
    }

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
        enderecoList: this.criarFormularioEnderecoList(entidade.enderecoList)
      }
    );

    return result;
  }


  criarFormularioEnderecoList(lista: PessoaEndereco[]) {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioPessoaEndereco(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  criarFormularioPessoaEndereco(entidade: PessoaEndereco) {
    if (!entidade) {
      entidade = new PessoaEndereco();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        endereco: this.criarFormularioEndereco(entidade.endereco),
      }
    );
    return result;
  }

  criarFormularioEndereco(entidade: Endereco) {
    if (!entidade) {
      entidade = new Endereco();
    }
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
    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this.servico.create(this.entidade);
    } else {
      this.servico.update(this.id, this.entidade);
    }
    this.router.navigate(['cadastro', 'pessoa']);
  }

  public novoEndereco() {
    let reg = this.criarFormularioPessoaEndereco(new PessoaEndereco());
    reg['editar'] = true;
    this.enderecoList.push(reg);
  }

  public excluirEndereco(reg) {
    console.log(reg);
    this.enderecoList.removeAt(reg);
  }

}
/*

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
    <form [formGroup]="form">
      <input type="checkbox" formControlName="published"> Published
      <div *ngIf="form.controls.published.value">

        <h2>Credentials</h2>
        <button (click)="addCreds()">Add</button>

        <div formArrayName="credentials" *ngFor="let creds of form.controls.credentials?.value; let i = index">
          <ng-container [formGroupName]="i">
            <input placeholder="Username" formControlName="username">
            <input placeholder="Password" formControlName="password">
          </ng-container>
        </div>

      </div>
    </form>
  `,
})
export class FormComponent  {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      published: true,
      credentials: this.fb.array([]),
    });
  }

  addCreds() {
    const creds = this.form.controls.credentials as FormArray;
    creds.push(this.fb.group({
      username: '',
      password: '',
    }));
  }
}
*/