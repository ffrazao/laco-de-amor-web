import { Component, OnInit } from '@angular/core';

import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { constante } from '../../../comum/constante';
import { ComprarCrudService } from '../comprar.service';
import { ComprarFormService } from '../comprar-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloCrudService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaCrudService } from '../../../cadastro/pessoa/pessoa.service';
import { Comprar } from '../../../comum/modelo/entidade/comprar';
import { EventoProduto } from '../../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../../comum/modelo/entidade/evento-pessoa';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { Produto } from '../../../comum/modelo/entidade/produto';
import { UnidadeMedida } from '../../../comum/modelo/entidade/unidade-medida';
import { Cotar } from '../../../comum/modelo/entidade/cotar';
import { MatSelectChange } from '@angular/material/select';
import { Fornecedor } from '../../../comum/modelo/entidade/fornecedor';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { EventoPessoaFuncaoCrudService } from '../../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { eventoPessoaListComparar, unidadeMedidaListComparar, cotacaoListComparar, eventoProdutoListComparar } from '../../../comum/ferramenta/ferramenta-sistema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this._serviceFormService.criarFormulario(new Comprar());

  public isEnviado = false;
  public entidade: Comprar;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  public cotacao;
  public cotacaoList: Cotar[] = [];

  constructor(
    private _service: ComprarCrudService,
    private _serviceFormService: ComprarFormService,
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
      this.frm = this._serviceFormService.criarFormulario(this.entidade);

      this.unidadeMedidaList = info['resolve']['apoio'][0];
      this.cotacaoList = info['resolve']['apoio'][1];
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
      this._router.navigate(['acao', 'comprar', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this._router.navigate(['acao', 'comprar']);
    }
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

  public cotacaoListComparar(o1: Cotar, o2: Cotar) {
    return cotacaoListComparar(o1, o2);
  }

  public async utilizarCotacao(cotacao: Cotar) {
    if (!this.frm.value.eventoPessoaList.length
      || await this._mensagem.confirme(`Confirme a utilização da cotação ${cotacao.data}`)) {
      // captar o valor atual do formulario
      const entidade: Comprar = this.frm.value as Comprar;
      // definir o evento pai
      entidade.pai = cotacao;
      // trabalhar as pessoas envolvidas
      const epesl = entidade.eventoPessoaList;
      // zerar lista de compra
      epesl.length = 0;
      // incluir os itens cotados como itens de compra
      entidade.pai.eventoPessoaList.forEach(ep => {
        ep.id = null;
        epesl.push(ep as EventoPessoa);
      });
      // trabalhar os produtos a serem comprados
      const eprdl = entidade.eventoProdutoList;
      // zerar lista de compra
      eprdl.length = 0;
      // incluir os itens cotados como itens de compra
      entidade.pai.eventoProdutoList.forEach(ep => {
        ep.id = null;
        ep.eventoPessoa = null;
        eprdl.push(ep as EventoProduto);
        const menorCotacao = this.menorCotacao(ep.produto, entidade.pai);
        ep.quantidade = menorCotacao.quantidade;
        ep.unidadeMedida = menorCotacao.unidadeMedida;
        ep.valorUnitario = menorCotacao.valorUnitario;
        ep.valorTotal = menorCotacao.valorTotal;
        ep.eventoPessoa = menorCotacao.eventoPessoa;
      });
      // atualizar o formulario
      this.frm = this._serviceFormService.criarFormulario(entidade);
    }
  }

  private menorCotacao(produto: Produto, cotacao: Cotar): EventoProduto {
    let result = new EventoProduto();

    for (const c of cotacao.eventoPessoaList) {
      for (const ep of c.eventoProdutoList) {
        if (produto.produtoModelo.id === ep.produto.produtoModelo.id) {
          if (!result.valorUnitario) {
            result = ep;
            result.eventoPessoa = c;
          } else {
            if (ep.valorUnitario < result.valorUnitario) {
              result = ep;
              result.eventoPessoa = c;
            }
          }
        }
      }
    }
    return result;
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

  public adicionarEventoProduto() {
    let ep = new EventoProduto();
    ep.produto = new Produto();
    ep.produto.produtoModelo = (this.pesquisarEventoProduto as unknown) as ProdutoModelo;
    if (!ep.unidadeMedida && this.unidadeMedidaList.length === 1) {
      ep.unidadeMedida = this.unidadeMedidaList[0];
    }
    let id = ep.produto.produtoModelo.id;
    let existe = false;
    this.eventoProdutoList.value.forEach(e => {
      if (e.produto.produtoModelo.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.eventoProdutoList.push(this._serviceFormService.criarFormularioEventoProduto(ep));
    }
    this.pesquisarEventoProduto = '';
  }

  public excluirEventoProduto(idx) {
    this.eventoProdutoList.removeAt(idx);
  }

  public filtrarCotacaoGenerica(eventoProduto: EventoProduto) {
    return !eventoProduto.eventoPessoa;
  }

  public eventoPessoaListChange(event: MatSelectChange, eventoProduto: FormGroup) {
    const produto: Produto = eventoProduto.value.produto;
    const fornecedor: Fornecedor = ((event.value as EventoPessoa).pessoa as Fornecedor);
    const cotacao: EventoProduto = this.getCotacao(produto, fornecedor);
    if (cotacao) {
      eventoProduto.controls.quantidade.setValue(cotacao.quantidade);
      eventoProduto.controls.unidadeMedida.setValue(cotacao.unidadeMedida);
      eventoProduto.controls.valorUnitario.setValue(cotacao.valorUnitario);
      eventoProduto.controls.valorTotal.setValue(cotacao.quantidade * cotacao.valorUnitario);
      eventoProduto.updateValueAndValidity();
    }
  }

  private getCotacao(produto: Produto, fornecedor: Fornecedor): EventoProduto {
    let result = null;
    const cotacao = (this.frm.value as Comprar).pai;
    if (cotacao) {
      if (cotacao.eventoPessoaList) {
        fora: for (let i = 0; i < cotacao.eventoPessoaList.length; i++) {
          if (cotacao.eventoPessoaList[i].eventoProdutoList) {
            for (let j = 0; j < cotacao.eventoPessoaList[i].eventoProdutoList.length; j++) {
              if (cotacao.eventoPessoaList[i].eventoProdutoList[j].eventoPessoa.pessoa.id === fornecedor.id &&
                cotacao.eventoPessoaList[i].eventoProdutoList[j].produto.produtoModelo.id === produto.produtoModelo.id) {
                result = cotacao.eventoPessoaList[i].eventoProdutoList[j];
                break fora;
              }
            }
          }
        }
      }
    }
    return result;
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
            if ((val.fornecedor && val.fornecedor.id) &&
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
