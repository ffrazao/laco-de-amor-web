import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Pessoa } from '../pessoa';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { PessoaEndereco } from '../pessoa-endereco';
import { Endereco } from '../../endereco/endereco';
import { Parceiro } from '../../parceiro/parceiro';
import { Fornecedor } from '../../fornecedor/fornecedor';
import { Cliente } from '../../cliente/cliente';
import { MensagemService } from 'src/app/comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this.criarFormulario(new Pessoa());

  public isEnviado = false;
  public entidade: Pessoa;
  public id: number;
  public acao: string;
  public isParceiro: boolean = false;
  public isFornecedor: boolean = false;
  public isCliente: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: PessoaService,
    private router: Router,
    private _mensagem: MensagemService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.isParceiro = !!this.entidade.parceiro && !!this.entidade.parceiro.id;
      this.isFornecedor = !!this.entidade.fornecedor && !!this.entidade.fornecedor.id;
      this.isCliente = !!this.entidade.cliente && !!this.entidade.cliente.id;
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this.criarFormulario(this.entidade);
    });
  }

  get parceiro(): FormGroup {
    return this.frm.get('parceiro') as FormGroup;
  }

  get fornecedor(): FormGroup {
    return this.frm.get('fornecedor') as FormGroup;
  }

  get cliente(): FormGroup {
    return this.frm.get('cliente') as FormGroup;
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
        nome: [entidade.nome, [Validators.required]],
        parceiro: this.criarFormularioParceiro(entidade.parceiro),
        fornecedor: this.criarFormularioFornecedor(entidade.fornecedor),
        cliente: this.criarFormularioCliente(entidade.cliente),
        tipo: [entidade.tipo, [Validators.required]],
        cpfCnpj: [entidade.cpfCnpj, []],
        email: [entidade.email, [Validators.email]],
        contato1: [entidade.contato1, []],
        contato2: [entidade.contato2, []],
        contato3: [entidade.contato3, []],
        enderecoList: this.criarFormularioEnderecoList(entidade.enderecoList),
      }
    );

    // inserir validador a depender de condição
    result.get('parceiro').get('id').valueChanges.subscribe((vlr) => {
      result.get('parceiro').get('funcao').setValidators(vlr ? [Validators.required] : []);
      result.get('parceiro').get('funcao').updateValueAndValidity();
    });

    return result;
  }

  criarFormularioParceiro(entidade: Parceiro) {
    if (!entidade) {
      entidade = new Parceiro();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        funcao: [entidade.funcao, []],
      }
    );

    return result;
  }

  criarFormularioFornecedor(entidade: Fornecedor) {
    if (!entidade) {
      entidade = new Fornecedor();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
  }

  criarFormularioCliente(entidade: Cliente) {
    if (!entidade) {
      entidade = new Cliente();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
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
        logradouro: [entidade.logradouro, [Validators.required]],
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

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this.servico.create(this.entidade);

      if (this.entidade.parceiro.id === -1) {
        this.entidade.parceiro.id = this.entidade.id;
      }
      if (this.entidade.fornecedor.id === -1) {
        this.entidade.fornecedor.id = this.entidade.id;
      }
      if (this.entidade.cliente.id === -1) {
        this.entidade.cliente.id = this.entidade.id;
      }

      this.router.navigate(['cadastro', 'pessoa', this.entidade.id]);
    } else {
      this.servico.update(this.id, this.entidade);
      this.router.navigate(['cadastro', 'pessoa']);
    }
  }

  public novoEndereco(event) {
    event.preventDefault();
    let reg = this.criarFormularioPessoaEndereco(new PessoaEndereco());
    reg['editar'] = true;
    this.enderecoList.push(reg);
  }

  public excluirEndereco(reg) {
    this.enderecoList.removeAt(reg);
  }

  public setParceiro() {
    if (!this.isParceiro) {
      let v = new Parceiro();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      v.funcao = null;
      this.parceiro.setValue(v);
    } else {
      this.parceiro.setValue({ id: null, funcao: null });
    }
  }

  public setCliente() {
    if (!this.isCliente) {
      let v = new Cliente();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      this.cliente.setValue(v);
    } else {
      this.cliente.setValue({ id: null });
    }
  }

  public setFornecedor() {
    if (!this.isFornecedor) {
      let v = new Fornecedor();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      this.fornecedor.setValue(v);
    } else {
      this.fornecedor.setValue({ id: null });
    }
  }

}
