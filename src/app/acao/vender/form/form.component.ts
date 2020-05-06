import { Endereco } from './../../../comum/modelo/entidade/endereco';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { constante } from '../../../comum/constante';
import { VenderService } from '../vender.service';
import { VenderFormService } from '../vender-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaService } from '../../../cadastro/pessoa/pessoa.service';
import { Vender } from '../../../comum/modelo/entidade/vender';
import { EventoProduto } from '../../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../../comum/modelo/entidade/evento-pessoa';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { Produto } from '../../../comum/modelo/entidade/produto';
import { UnidadeMedida } from '../../../comum/modelo/entidade/unidade-medida';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { EventoPessoaFuncaoService } from '../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { eventoPessoaListComparar, unidadeMedidaListComparar, eventoProdutoListComparar, pessoaListComparar, enderecoListComparar } from '../../../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this._formService.criarFormulario(new Vender());

  public isEnviado = false;
  public entidade: Vender;
  public id: number;
  public acao: string;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  public eventoProdutoEditando = false;

  constructor(
    private _service: VenderService,
    private _formService: VenderFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _produtoModeloService: ProdutoModeloService,
    private _pessoaService: PessoaService,
    private _eventoPessoaFuncaoService: EventoPessoaFuncaoService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });
    this._route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this._formService.criarFormulario(this.entidade);

      this.unidadeMedidaList = info['resolve']['apoio'][0];
    });
  }

  get eventoPessoaList() {
    return this.frm.get('eventoPessoaList') as FormArray;
  }

  get eventoProdutoList() {
    return this.frm.get('eventoProdutoList') as FormArray;
  }

  public enviar(event) {
    event.preventDefault();
    this.isEnviado = true;

    console.log(this.frm);

    if (this.frm.invalid) {
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }
    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this._service.create(this.entidade);
      this._router.navigate(['acao', 'vender', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this._router.navigate(['acao', 'vender']);
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

  public pessoaListComparar(o1: Pessoa, o2: Pessoa) {
    return pessoaListComparar(o1, o2);
  }

  public enderecoListComparar(o1: Endereco, o2: Endereco) {
    return enderecoListComparar(o1, o2);
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
        // if (typeof this.pesquisarEventoPessoa === 'string' && this.pesquisarEventoPessoa.length) {
        //   this._pessoaService.lista.forEach(val => {
        //     let p = this.pesquisarEventoPessoa.toLowerCase();
        //     if ((val.cliente && val.cliente.id) &&
        //       (val.nome.toLowerCase().includes(p) || val.cpfCnpj.toLowerCase().includes(p))) {
        //       result.push(Object.assign({}, val));
        //     }
        //   });
        // }
        if (typeof this.frm.value.eventoPessoaList[0].pessoa === 'string' && this.frm.value.eventoPessoaList[0].pessoa.length) {
          this._pessoaService.lista.forEach(val => {
            let p = this.frm.value.eventoPessoaList[0].pessoa.toLowerCase();
            if ((val.cliente && val.cliente.id) &&
              (val.nome.toLowerCase().includes(p) || val.cpfCnpj.toLowerCase().includes(p))) {
              result.push(Object.assign({}, val));
            }
          });
        }
        resolve(result);
        return result;
      });
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
