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
import { adMime, removeMime, deepCopy, } from '../../../comum/ferramenta/ferramenta-comum';

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
  private _cotacao;
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
          p.eventoProdutoList.forEach((ep: EventoProduto) => {
            if (ep.produto.produtoModelo.foto) {
              ep.produto.produtoModelo.foto = adMime(ep.produto.produtoModelo.foto);
            }
          });
        }
        if (p.eventoPessoaList) {
          p.eventoPessoaList.forEach((ep: EventoPessoa) => {
            if (ep.eventoProdutoList) {
              ep.eventoProdutoList.forEach((ep1: EventoProduto) => {
                if (ep1.produto.produtoModelo.foto) {
                  ep1.produto.produtoModelo.foto = adMime(ep1.produto.produtoModelo.foto);
                }
              });
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

      info.resolve.apoio[2].cotacaoList.subscribe((a: Cotar[]) => {
        this.cotacaoList.length = 0;
        a.forEach(aa => this.cotacaoList.push(aa));
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
      console.error(this.frm);
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    const entidade = this.frm.value;
    if (entidade.eventoProdutoList) {
      entidade.eventoProdutoList.forEach((ep: EventoProduto) =>
        ep.produto.produtoModelo.foto = removeMime(ep.produto.produtoModelo.foto)
      );
    }
    if (entidade.eventoPessoaList) {
      entidade.eventoPessoaList.forEach((ep: EventoPessoa) => {
        if (ep.eventoProdutoList) {
          ep.eventoProdutoList.forEach((epp: EventoProduto) => epp.produto.produtoModelo.foto = removeMime(epp.produto.produtoModelo.foto));
        }
      });
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
    this.cotacao = f.pai;
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

  public get cotacao() {
    if (!this._cotacao) {
      const entidade = this.frm.value;
      this._cotacao = entidade.pai;
    }
    return this._cotacao;
  }

  public set cotacao(valor) {
    this._cotacao = valor;
  }

  public async utilizarCotacao(cotacao: Cotar) {
    if (!(this.frm.value.eventoPessoaList.length && this.frm.value.eventoProdutoList.length)
      || await this._mensagem.confirme(`Confirme a utilização da cotação ${cotacao.data}. Os dados atuais serão substituidos`)) {
      const entidade = new Comprar();
      const f = (this.frm.value as Comprar);
      entidade.id = f.id;
      entidade.data = f.data;
      entidade.eventoTipo = deepCopy(f.eventoTipo);
      entidade.eventoPessoaList = [];
      entidade.eventoProdutoList = [];
      entidade.pai = deepCopy(cotacao);
      entidade.paiId = cotacao.id;

      cotacao.eventoPessoaList.forEach((v: EventoPessoa) => {
        const x = new EventoPessoa();
        x.eventoPessoaFuncao = deepCopy(v.eventoPessoaFuncao);
        x.pessoa = deepCopy(v.pessoa);
        entidade.eventoPessoaList.push(x);
      });

      cotacao.eventoProdutoList.forEach((v: EventoProduto) => {
        const x = new EventoProduto();
        x.produto = deepCopy(v.produto);
        const menorCotacao = this.menorCotacao(v.produto, cotacao);
        x.quantidade = menorCotacao.quantidade;
        x.unidadeMedida = deepCopy(menorCotacao.unidadeMedida);
        x.valorUnitario = menorCotacao.valorUnitario;
        x.valorTotal = menorCotacao.valorTotal;
        x.eventoPessoa = new EventoPessoa();
        x.eventoPessoa.pessoa = deepCopy(menorCotacao.eventoPessoa.pessoa);
        x.eventoPessoa.eventoPessoaFuncao = deepCopy(menorCotacao.eventoPessoa.eventoPessoaFuncao);
        entidade.eventoProdutoList.push(x);
      });

      this.frm = this._formService.criarFormulario(entidade);
      this.frm.updateValueAndValidity();
    }
  }

  public async removerCotacao() {
    if (await this._mensagem.confirme(`Confirme a remoção de referência à cotação ${this.frm.value.pai.data}.`)) {
      let encontrou = false;
      for (const ct of this.cotacaoList) {
        if (ct.id === this.frm.value.paiId) {
          encontrou = true;
        }
      }
      if (!encontrou) {
        this.cotacaoList.push(this.frm.value.pai);
        this.cotacaoList.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      }
      this.frm.controls.pai.setValue(null);
      this.frm.controls.paiId.setValue(null);
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

  public pesquisarEventoProduto = '';

  public $filteredOptionsEventoProduto = new Promise((resolve, reject) => {
    const result = [];
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
          this._produtoModeloService.filtro.nome = this.pesquisarEventoProduto;
          this._produtoModeloService.filtro.codigo = this.pesquisarEventoProduto;
          this._produtoModeloService.filtro.materiaPrima = 'S';
          this._produtoModeloService.filtrar().subscribe(lista => {
            lista.forEach(val => {
              result.push(Object.assign({}, val));
            });
            resolve(result);
            return result;
          });
        }
      });
    }
  }

  public podeAdicionarEventoProduto() {
    return typeof this.pesquisarEventoProduto === 'string';
  }

  public adicionarEventoProduto() {
    const ep = new EventoProduto();
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
    const produto: Produto = (eventoProduto.value.produto);
    const fornecedor: Fornecedor = ((event.value as EventoPessoa).pessoa as Fornecedor);
    const cotacao: EventoProduto = this.getCotacao(produto, fornecedor);
    if (cotacao) {
      eventoProduto.controls.quantidade.setValue(cotacao.quantidade);
      eventoProduto.controls.unidadeMedida.setValue(deepCopy(cotacao.unidadeMedida));
      eventoProduto.controls.valorUnitario.setValue(cotacao.valorUnitario);
      eventoProduto.controls.valorTotal.setValue(this._formService.multiplicaValores(cotacao.quantidade, cotacao.valorUnitario));
    } else {
      eventoProduto.controls.valorUnitario.setValue(null);
      eventoProduto.controls.valorTotal.setValue(null);
    }
    eventoProduto.updateValueAndValidity();
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

  public pesquisarEventoPessoa = '';

  public $filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
    const result = [];
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
          this._pessoaService.filtro.nome = this.pesquisarEventoPessoa;
          this._pessoaService.filtro.cpfCnpj = this.pesquisarEventoPessoa;
          this._pessoaService.filtro.pessoaVinculoTipo = ['FORNECEDOR'];
          this._pessoaService.filtrar().subscribe(lista => {
            lista.forEach(val => {
              result.push(Object.assign({}, val));
            });
            resolve(result);
            return result;
          });
        }
      });
    }
  }

  public podeAdicionarEventoPessoa() {
    return typeof this.pesquisarEventoPessoa === 'string';
  }

  public adicionarEventoPessoa(entidade: FormGroup) {
    const ep = new EventoPessoa();
    ep.eventoPessoaFuncao = this.eventoPessoaFuncao;
    ep.pessoa = (this.pesquisarEventoPessoa as unknown) as Pessoa;
    const id = ep.pessoa.id;
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
