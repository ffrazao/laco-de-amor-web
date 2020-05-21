import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaCrudService } from '../pessoa.service';
import { PessoaFormService } from '../pessoa-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { Parceiro } from '../../../comum/modelo/entidade/parceiro';
import { Fornecedor } from '../../../comum/modelo/entidade/fornecedor';
import { Cliente } from '../../../comum/modelo/entidade/cliente';
import { PessoaEndereco } from '../../../comum/modelo/entidade/pessoa-endereco';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this._formService.criarFormulario(new Pessoa());

  public isEnviado = false;
  public id: number;

  public isParceiro = false;
  public isFornecedor = false;
  public isCliente = false;

  public enderecoEditando = false;

  constructor(
    private _service: PessoaCrudService,
    private _formService: PessoaFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      info.resolve.principal.subscribe((p: Pessoa) => {
        this._service.entidade = p;
        this.isParceiro = !!this._service.entidade.parceiro && !!this._service.entidade.parceiro.id;
        this.isFornecedor = !!this._service.entidade.fornecedor && !!this._service.entidade.fornecedor.id;
        this.isCliente = !!this._service.entidade.cliente && !!this._service.entidade.cliente.id;
        this._service.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
        this.frm = this._formService.criarFormulario(this._service.entidade);
      });
    });
  }

  public get acao() {
    return this._service.acao;
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

  get pessoaEnderecoList(): FormArray {
    return this.frm.get('pessoaEnderecoList') as FormArray;
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    if (this.frm.invalid) {
      const msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    const entidade = this.frm.value;

    if ('Novo' === this._service.acao) {
      if (entidade.parceiro.id === -1) {
        entidade.parceiro.id = entidade.id;
      }
      if (entidade.fornecedor.id === -1) {
        entidade.fornecedor.id = entidade.id;
      }
      if (entidade.cliente.id === -1) {
        entidade.cliente.id = entidade.id;
      }
      this._service.create(entidade).subscribe((id: number) => {
        this._router.navigate(['cadastro', 'pessoa', id]);
      });
    } else {
      if (!entidade.parceiro.id) {
        entidade.parceiro = null;
      }
      if (!entidade.fornecedor.id) {
        entidade.fornecedor = null;
      }
      if (!entidade.cliente.id) {
        entidade.cliente = null;
      }
      this._service.update(this.id, entidade).subscribe(() => {
        this._router.navigate(['cadastro', 'pessoa']);
      });
    }
  }

  public novoEndereco(event) {
    event.preventDefault();
    const e = new PessoaEndereco();
    const reg = this._formService.criarFormularioPessoaEndereco(e);
    this.enderecoEditando = true;
    reg['editar'] = true;
    this.pessoaEnderecoList.push(reg);
  }

  public salvarEndereco(reg) {
    delete reg['anterior'];
    reg['editar'] = false;
    this.enderecoEditando = false;
  }

  public editarEndereco(reg) {
    reg['anterior'] = reg.value;
    reg['editar'] = true;
    this.enderecoEditando = true;
  }

  public excluirEndereco(idx) {
    this.pessoaEnderecoList.removeAt(idx);
    this.enderecoEditando = false;
  }

  public cancelarEndereco(reg) {
    if (this.pessoaEnderecoList.at(reg)['anterior']) {
      const vlr = this.pessoaEnderecoList.at(reg)['anterior'];
      this.pessoaEnderecoList.at(reg).setValue(vlr);
      this.pessoaEnderecoList.at(reg)['editar'] = false;
      delete this.pessoaEnderecoList.at(reg)['anterior'];
    } else {
      this.pessoaEnderecoList.removeAt(reg);
    }
    this.enderecoEditando = false;
  }

  public setParceiro() {
    if (!this.isParceiro) {
      const v = new Parceiro();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      v.funcao = null;
      this.parceiro.setValue(v);
    } else {
      this.parceiro.setValue({ id: null, funcao: null });
    }
  }

  public setCliente() {
    if (!this.isCliente) {
      const v = new Cliente();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      this.cliente.setValue(v);
    } else {
      this.cliente.setValue({ id: null });
    }
  }

  public setFornecedor() {
    if (!this.isFornecedor) {
      const v = new Fornecedor();
      v.id = this.frm.value.id ? this.frm.value.id : -1;
      this.fornecedor.setValue(v);
    } else {
      this.fornecedor.setValue({ id: null });
    }
  }

}
