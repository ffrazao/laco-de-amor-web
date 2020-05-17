import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaService } from '../pessoa.service';
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
  public entidade: Pessoa;
  public id: number;
  public acao: string;
  public isParceiro: boolean = false;
  public isFornecedor: boolean = false;
  public isCliente: boolean = false;

  public enderecoEditando = false;

  constructor(
    private _service: PessoaService,
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
      this.entidade = info['resolve']['principal'];
      this.isParceiro = !!this.entidade.parceiro && !!this.entidade.parceiro.id;
      this.isFornecedor = !!this.entidade.fornecedor && !!this.entidade.fornecedor.id;
      this.isCliente = !!this.entidade.cliente && !!this.entidade.cliente.id;
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this._formService.criarFormulario(this.entidade);
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
      this._service.create(this.entidade);

      if (this.entidade.parceiro.id === -1) {
        this.entidade.parceiro.id = this.entidade.id;
      }
      if (this.entidade.fornecedor.id === -1) {
        this.entidade.fornecedor.id = this.entidade.id;
      }
      if (this.entidade.cliente.id === -1) {
        this.entidade.cliente.id = this.entidade.id;
      }
      this._service.lista.push(this.entidade);
      this._router.navigate(['cadastro', 'pessoa', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this._router.navigate(['cadastro', 'pessoa']);
    }
  }

  public novoEndereco(event) {
    event.preventDefault();
    let e = new PessoaEndereco();
    let reg = this._formService.criarFormularioPessoaEndereco(e);
    this.enderecoEditando = true;
    reg['editar'] = true;
    this.enderecoList.push(reg);
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
    this.enderecoList.removeAt(idx);
    this.enderecoEditando = false;
  }

  public cancelarEndereco(reg) {
    if (this.enderecoList.at(reg)['anterior']) {
      let vlr = this.enderecoList.at(reg)['anterior'];
      this.enderecoList.at(reg).setValue(vlr);
      this.enderecoList.at(reg)['editar']=false;
      delete this.enderecoList.at(reg)['anterior'];
    } else {
      this.enderecoList.removeAt(reg);
    }
    this.enderecoEditando = false;
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
