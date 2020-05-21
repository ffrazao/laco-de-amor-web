import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { constante } from '../../../comum/constante';
import { UtilizarCrudService } from '../utilizar.service';
import { UtilizarFormService } from '../utilizar-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloCrudService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaCrudService } from '../../../cadastro/pessoa/pessoa.service';
import { Utilizar } from '../../../comum/modelo/entidade/utilizar';
import { EventoProduto } from '../../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../../comum/modelo/entidade/evento-pessoa';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { Produto } from '../../../comum/modelo/entidade/produto';
import { UnidadeMedida } from '../../../comum/modelo/entidade/unidade-medida';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { EventoPessoaFuncaoCrudService } from '../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { eventoPessoaListComparar, unidadeMedidaListComparar, eventoProdutoListComparar } from '../../../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this._formService.criarFormulario(new Utilizar());

  public isEnviado = false;
  public entidade: Utilizar;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  public eventoProdutoEditando = false;

  constructor(
    private _service: UtilizarCrudService,
    private _formService: UtilizarFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _produtoModeloService: ProdutoModeloCrudService,
    private _pessoaService: PessoaCrudService,
    private _eventoPessoaFuncaoService: EventoPessoaFuncaoCrudService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });
    this._route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this._service.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this._formService.criarFormulario(this.entidade);

      this.unidadeMedidaList = info['resolve']['apoio'][0];
    });
  }

  public get acao() {
    return this._service.acao;
  }

  get eventoProdutoList() {
    return this.frm.get('eventoProdutoList') as FormArray;
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    console.log(this.frm.value);

    if (this.frm.invalid) {
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }
    this.entidade = this.frm.value;
    if ('Novo' === this._service.acao) {
      this._service.create(this.entidade);
      this._router.navigate(['acao', 'utilizar', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this._router.navigate(['acao', 'utilizar']);
    }
  }

  public novoEventoProduto(event) {
    event.preventDefault();
    let e = new EventoProduto();
    let reg = this._formService.criarFormularioEventoProduto(e);
    this.eventoProdutoEditando = true;
    reg['editar'] = true;
    this.eventoProdutoList.push(reg);
  }

  public salvarEventoProduto(reg) {
    delete reg['anterior'];
    reg['editar'] = false;
    this.eventoProdutoEditando = false;
  }

  public editarEventoProduto(reg) {
    reg['anterior'] = reg.value;
    reg['editar'] = true;
    this.eventoProdutoEditando = true;
  }

  public excluirEventoProduto(idx) {
    this.eventoProdutoList.removeAt(idx);
    this.eventoProdutoEditando = false;
  }

  public cancelarEventoProduto(reg) {
    if (this.eventoProdutoList.at(reg)['anterior']) {
      let vlr = this.eventoProdutoList.at(reg)['anterior'];
      this.eventoProdutoList.at(reg).setValue(vlr);
      this.eventoProdutoList.at(reg)['editar'] = false;
      delete this.eventoProdutoList.at(reg)['anterior'];
    } else {
      this.eventoProdutoList.removeAt(reg);
    }
    this.eventoProdutoEditando = false;
  }

























  public eventoPessoaListComparar(o1: EventoPessoa, o2: EventoPessoa) {
    return eventoPessoaListComparar(o1, o2);
  }

  public eventoProdutoListComparar(o1: EventoProduto, o2: EventoProduto) {
    return eventoProdutoListComparar(o1, o2);
  }

  public unidadeMedidaListComparar(o1: UnidadeMedida, o2: UnidadeMedida) {
    return unidadeMedidaListComparar(o1, o2);
  }


  // GESTÃO DOS PRODUTOS A COTAR
  public displayFnEventoProduto(produtoModelo?: ProdutoModelo): string {
    return produtoModelo ? `${produtoModelo.nome} (${produtoModelo.codigo})` : '';
  }

  pesquisarEventoProduto = '';

  $filteredOptionsEventoProduto = new Promise((resolve, reject) => {
    let result = [];
    resolve(result);
    return result;
  });

  public completarEventoProduto(event: KeyboardEvent) {
    if (
      !(
        (event.key === "ArrowUp") ||
        (event.key === "ArrowDown") ||
        (event.key === "ArrowRight") ||
        (event.key === "ArrowLeft"))
    ) {
      this.$filteredOptionsEventoProduto = new Promise((resolve, reject) => {
        let result = [];
        if (typeof this.pesquisarEventoProduto === 'string' && this.pesquisarEventoProduto.length) {
          this._produtoModeloService.lista.forEach(val => {
            let p = this.pesquisarEventoProduto.toLowerCase();
            if (val.materiaPrima === 'S' &&
              (val.nome.toLowerCase().includes(p) || val.codigo.toLowerCase().includes(p))) {
              result.push(Object.assign({}, val));
            }
          });
        }
        resolve(result);
        return result;
      })
    }
  }

  public podeAdicionarEventoProduto() {
    return typeof this.pesquisarEventoProduto === 'string';
  }

  public adicionarEventoProduto(fg: FormGroup) {

    let produto = new Produto();
    produto.produtoModelo = (this.pesquisarEventoProduto as unknown) as ProdutoModelo;

    let id = produto.produtoModelo.id;
    let existe = false;
    if (this.frm['produtoList']) {
      this.frm['produtoList'].forEach(e => {
        if (e.produtoModelo && e.produtoModelo.id === id) {
          existe = true;
        }
      });
    }
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this._formService.adicionaProdutoList(this.frm, produto);
    }
    this.pesquisarEventoProduto = '';
    fg['produto'].setValue(produto);
  }

  public filtrarCotacaoGenerica(eventoProduto: EventoProduto) {
    return !eventoProduto.eventoPessoa;
  }

  public displayFnEventoPessoa(pessoa?: Pessoa): string {
    return pessoa ? `${pessoa.nome} (${pessoa.cpfCnpj})` : '';
  }

  pesquisarEventoPessoa = '';

  $filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
    let result = [];
    resolve(result);
    return result;
  });

  public completarEventoPessoa(event: KeyboardEvent) {
    if (
      !(
        (event.key === "ArrowUp") ||
        (event.key === "ArrowDown") ||
        (event.key === "ArrowRight") ||
        (event.key === "ArrowLeft"))
    ) {
      this.$filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
        let result = [];
        if (typeof this.pesquisarEventoPessoa === 'string' && this.pesquisarEventoPessoa.length) {
          this._pessoaService.lista.forEach(val => {
            let p = this.pesquisarEventoPessoa.toLowerCase();
            if ((val.parceiro && val.parceiro.id && val.parceiro.funcao === 'Costureiro(a)') &&
              (val.nome.toLowerCase().includes(p) || val.cpfCnpj.toLowerCase().includes(p))) {
              result.push(Object.assign({}, val));
            }
          });
        }
        resolve(result);
        return result;
      })
    }
  }

  public podeAdicionarEventoPessoa() {
    return typeof this.pesquisarEventoPessoa === 'string';
  }

  public adicionarEventoPessoa(entidade: FormGroup) {
    let ep = new EventoPessoa();
    ep.eventoPessoaFuncao = this._eventoPessoaFuncaoService.lista[0];
    ep.pessoa = (this.pesquisarEventoPessoa as unknown) as Pessoa;
    let id = ep.pessoa.id;
    let existe = false;
    this.frm.get('eventoPessoaList').value.forEach(e => {
      if (e.pessoa.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.frm.get('eventoPessoaList').value.push(ep);
    }
    entidade.get('eventoPessoa').setValue(ep);
    this.pesquisarEventoPessoa = '';
  }

}
