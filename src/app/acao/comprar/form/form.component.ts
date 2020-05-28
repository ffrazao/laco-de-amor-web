import { environment } from './../../../../environments/environment';
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
import { EventoPessoaFuncao } from '../../../comum/modelo/entidade/evento-pessoa-funcao';
import { adMime, removeMime } from '../../../comum/ferramenta/ferramenta-comum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm = this._formService.criarFormulario(new Comprar());

  public isEnviado = false;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  private eventoPessoaFuncao;
  public cotacao;
  public cotacaoList: Cotar[] = [];

  constructor(
    private _service: ComprarCrudService,
    private _formService: ComprarFormService,
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
      info.resolve.principal.subscribe((p: Comprar) => {
        if (p.eventoProdutoList) {
          p.eventoProdutoList.forEach((ep: EventoProduto) =>
            ep.produto.produtoModelo.foto = adMime(ep.produto.produtoModelo.foto)
          );
        }
        if (p.eventoPessoaList) {
          p.eventoPessoaList.forEach((ep: EventoPessoa) => {
            if (ep.eventoProdutoList) {
              ep.eventoProdutoList.forEach((ep1: EventoProduto) =>
                ep1.produto.produtoModelo.foto = adMime(ep1.produto.produtoModelo.foto)
              );
            }
          });
        }
        this._service.entidade = p;
        this.carregar(this._service.entidade);
      });

      info.resolve.apoio[0].unidadeMedidaList.subscribe((a: UnidadeMedida[]) => {
        this.unidadeMedidaList.length = 0;
        a.forEach(aa => this.unidadeMedidaList.push(aa));
      });

      info.resolve.apoio[1].eventoPessoaFuncao.subscribe((a: EventoPessoaFuncao[]) => {
        this.eventoPessoaFuncao = a[0];
      });
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

    if (this.frm.invalid) {
      const msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    const entidade = this.frm.value;
    if (entidade.eventoProdutoList) {
      entidade.eventoProdutoList.forEach((ep: EventoProduto) =>
        ep.produto.produtoModelo.foto = removeMime(ep.produto.produtoModelo.foto)
      );
    }

    if ('Novo' === this._service.acao) {
      this._service.create(entidade).subscribe((id: number) => {
        this._mensagem.sucesso('Novo registro efetuado!\n\nVisualizando...');
        this._router.navigate(['acao', this._service.funcionalidade, id]);
      });
    } else {
      this._service.update(this.id, entidade).subscribe(() => {
        this._mensagem.sucesso('Registro atualizado!');
        this._router.navigate(['acao', this._service.funcionalidade]);
      });
    }
  }

  public carregar(f: Comprar) {
    if (!f) {
      f = new Comprar();
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

  public adMime(v) {
    return adMime(v);
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
      this.frm = this._formService.criarFormulario(entidade);
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
        (event.key === 'ArrowUp') ||
        (event.key === 'ArrowDown') ||
        (event.key === 'ArrowRight') ||
        (event.key === 'ArrowLeft'))
    ) {
      this.$filteredOptionsEventoProduto = new Promise((resolve, reject) => {
        const result = [];
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
    const id = ep.produto.produtoModelo.id;
    let existe = false;
    this.eventoProdutoList.value.forEach(e => {
      if (e.produto.produtoModelo.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.eventoProdutoList.push(this._formService.criarFormularioEventoProduto(ep));
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
        (event.key === 'ArrowUp') ||
        (event.key === 'ArrowDown') ||
        (event.key === 'ArrowRight') ||
        (event.key === 'ArrowLeft'))
    ) {
      this.$filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
        const result = [];
        if (typeof this.pesquisarEventoPessoa === 'string' && this.pesquisarEventoPessoa.length) {
          this._pessoaService.lista.forEach(val => {
            const p = this.pesquisarEventoPessoa.toLowerCase();
            if ((val.fornecedor && val.fornecedor.id) &&
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
