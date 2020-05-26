import { PessoaVinculoTipo } from './../../comum/modelo/dominio/pessoa-vinculo-tipo';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Pessoa } from '../../comum/modelo/entidade/pessoa';
import { Parceiro } from '../../comum/modelo/entidade/parceiro';
import { Fornecedor } from '../../comum/modelo/entidade/fornecedor';
import { Cliente } from '../../comum/modelo/entidade/cliente';
import { PessoaEndereco } from '../../comum/modelo/entidade/pessoa-endereco';
import { Endereco } from '../../comum/modelo/entidade/endereco';
import { PessoaFiltroDTO } from '../../comum/modelo/dto/pessoa.filtro.dto';

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

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        nome: [entidade.nome, [Validators.required]],
        parceiro: this.criarFormularioParceiro(entidade.parceiro),
        fornecedor: this.criarFormularioFornecedor(entidade.fornecedor),
        cliente: this.criarFormularioCliente(entidade.cliente),
        pessoaTipo: [entidade.pessoaTipo, [Validators.required]],
        cpfCnpj: [entidade.cpfCnpj, []],
        email: [entidade.email, [Validators.email]],
        contato1: [entidade.contato1, []],
        contato2: [entidade.contato2, []],
        contato3: [entidade.contato3, []],
        pessoaEnderecoList: this.criarFormularioPessoaEnderecoList(entidade.pessoaEnderecoList),
      }
    );

    return result;
  }

  public criarFormularioParceiro(entidade: Parceiro) {
    if (!entidade) {
      return this._formBuilder.control(null, []);
    }

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        funcao: [entidade.funcao, [Validators.required]],
      }
    );

    return result;
  }

  public criarFormularioFornecedor(entidade: Fornecedor) {
    if (!entidade) {
      return this._formBuilder.control(null, []);
    }

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
  }

  public criarFormularioCliente(entidade: Cliente) {
    if (!entidade) {
      return this._formBuilder.control(null, []);
    }

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
      }
    );

    return result;
  }

  public criarFormularioPessoaEnderecoList(lista: PessoaEndereco[]) {
    const result = [];

    if (lista && lista.length) {
      for (const pessoaEndereco of lista) {
        result.push(this.criarFormularioPessoaEndereco(pessoaEndereco));
      }
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioPessoaEndereco(entidade: PessoaEndereco) {
    if (!entidade) {
      entidade = new PessoaEndereco();
    }
    const result = this._formBuilder.group(
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
    const result = this._formBuilder.group(
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

  public criarFormularioFiltro(entidade: PessoaFiltroDTO) {
    if (!entidade) {
      entidade = new PessoaFiltroDTO();
    }
    const result = this._formBuilder.group(
      {
        nome: [entidade.nome, []],
        pessoaTipo: [entidade.pessoaTipo, []],
        cpfCnpj: [entidade.cpfCnpj, []],
        pessoaVinculoTipo: [entidade.pessoaVinculoTipo, []],
      }
    );
    return result;
  }

}
