import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Pessoa } from '../../comum/entidade/modelo/pessoa';
import { Parceiro } from 'src/app/comum/entidade/modelo/parceiro';
import { Fornecedor } from 'src/app/comum/entidade/modelo/fornecedor';
import { Cliente } from 'src/app/comum/entidade/modelo/cliente';
import { PessoaEndereco } from 'src/app/comum/entidade/modelo/pessoa-endereco';
import { Endereco } from 'src/app/comum/entidade/modelo/endereco';

@Injectable()
export class PessoaFormService {

  constructor(
    private _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: Pessoa) {
    if (!entidade) {
      entidade = new Pessoa();
    }

    let result = this._formBuilder.group(
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

  public criarFormularioParceiro(entidade: Parceiro) {
    if (!entidade) {
      entidade = new Parceiro();
    }

    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        funcao: [entidade.funcao, []],
      }
    );

    return result;
  }

  public criarFormularioFornecedor(entidade: Fornecedor) {
    if (!entidade) {
      entidade = new Fornecedor();
    }

    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
  }

  public criarFormularioCliente(entidade: Cliente) {
    if (!entidade) {
      entidade = new Cliente();
    }

    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
  }

  public criarFormularioEnderecoList(lista: PessoaEndereco[]) {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioPessoaEndereco(lista[i]));
      }
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioPessoaEndereco(entidade: PessoaEndereco) {
    if (!entidade) {
      entidade = new PessoaEndereco();
    }
    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        endereco: this.criarFormularioEndereco(entidade.endereco),
      }
    );
    return result;
  }

  public criarFormularioEndereco(entidade: Endereco) {
    if (!entidade) {
      entidade = new Endereco();
    }
    let result = this._formBuilder.group(
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

}