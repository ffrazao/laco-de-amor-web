import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioCrudService } from '../usuario.service';
import { UsuarioFormService } from '../usuario-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Usuario } from '../../../comum/modelo/entidade/usuario';
import { Cliente } from '../../../comum/modelo/entidade/cliente';
import { Fornecedor } from '../../../comum/modelo/entidade/fornecedor';
import { Parceiro } from '../../../comum/modelo/entidade/parceiro';
import { deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { ParceiroFuncao } from './../../../comum/modelo/dominio/parceiro-funcao';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup = this._formService.criarFormulario(new Usuario());

  public isEnviado = false;
  public id: number;

  public enderecoEditando = false;

  public parceiroFuncaoList: any;
  public usuarioTipoList: any;

  private _cliente: boolean;
  private _fornecedor: boolean;
  private _parceiro: boolean;

  constructor(
    private _service: UsuarioCrudService,
    private _formService: UsuarioFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
  ) {
    this.parceiroFuncaoList = deEnumParaChaveValor(ParceiroFuncao);
    //this.usuarioTipoList = deEnumParaChaveValor(UsuarioTipo);
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      this._service.acao = !info.resolve.acao ? 'Novo' : info.resolve.acao;

      info.resolve.principal.subscribe((p: Usuario) => {
        this._service.entidade = p;
        this.carregar(this._service.entidade);
      });
    });
  }

  public get acao() {
    return this._service.acao;
  }

  get usuarioEnderecoList(): FormArray {
    return this.frm.get('usuarioEnderecoList') as FormArray;
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
      this._service.create(entidade).subscribe((id: number) => {
        this._mensagem.sucesso('Novo registro efetuado!\n\nVisualizando...');
        this._router.navigate(['cadastro', this._service.funcionalidade, id]);
      });
    } else {
      this._service.update(this.id, entidade).subscribe(() => {
        this._mensagem.sucesso('Registro atualizado!');
        this._router.navigate(['cadastro', this._service.funcionalidade]);
      });
    }
  }

  public carregar(f: Usuario) {
    if (!f) {
      f = new Usuario();
    }
    this.frm = this._formService.criarFormulario(f);
  }

  public async restaurar() {
    if (await
      this._mensagem.confirme(
        `
        <p>
           Confirma a restauração dos dados do formulário?
        </p>
        <div class="alert alert-danger" role="alert">
           Todas as modificações serão perdidas!
        </div>
         `)) {
      this.carregar(this._service.entidade);
    }
  }

  public novoEndereco(event) {
    // event.preventDefault();
    // const e = new UsuarioEndereco();
    // const reg = this._formService.criarFormularioUsuarioEndereco(e);
    // this.enderecoEditando = true;
    // reg['editar'] = true;
    // this.usuarioEnderecoList.push(reg);
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
    this.usuarioEnderecoList.removeAt(idx);
    this.enderecoEditando = false;
  }

  public cancelarEndereco(reg) {
    if (this.usuarioEnderecoList.at(reg)['anterior']) {
      const vlr = this.usuarioEnderecoList.at(reg)['anterior'];
      this.usuarioEnderecoList.at(reg).setValue(vlr);
      this.usuarioEnderecoList.at(reg)['editar'] = false;
      delete this.usuarioEnderecoList.at(reg)['anterior'];
    } else {
      this.usuarioEnderecoList.removeAt(reg);
    }
    this.enderecoEditando = false;
  }

  get cliente(): FormGroup {
    return this.frm.get('cliente') as FormGroup;
  }

  get fornecedor(): FormGroup {
    return this.frm.get('fornecedor') as FormGroup;
  }

  get parceiro(): FormGroup {
    return this.frm.get('parceiro') as FormGroup;
  }

  public get isCliente(): boolean {
    if (this._cliente === undefined) {
    }
    this._cliente = this.cliente.value !== null;
    return this._cliente;
  }

  public set isCliente(is: boolean) {
    // let v = null;
    // if (is) {
    //   v = new Cliente();
    //   v.id = this.frm.value.id;
    // }
    // this.frm.setControl('cliente', this._formService.criarFormularioCliente(v));
    // this._cliente = is;
  }

  public get isFornecedor(): boolean {
    if (this._fornecedor === undefined) {
    }
    this._fornecedor = this.fornecedor.value !== null;
    return this._fornecedor;
  }

  public set isFornecedor(is: boolean) {
    // let v = null;
    // if (is) {
    //   v = new Fornecedor();
    //   v.id = this.frm.value.id;
    // }
    // this.frm.setControl('fornecedor', this._formService.criarFormularioFornecedor(v));
    // this._fornecedor = is;
  }

  public get isParceiro(): boolean {
    if (this._parceiro === undefined) {
    }
    this._parceiro = this.parceiro.value !== null;
    return this._parceiro;
  }

  public set isParceiro(is: boolean) {
    // let v = null;
    // if (is) {
    //   v = new Parceiro();
    //   v.id = this.frm.value.id;
    //   v.funcao = null;
    // }
    // this.frm.setControl('parceiro', this._formService.criarFormularioParceiro(v));
    // this._parceiro = is;
  }

}
