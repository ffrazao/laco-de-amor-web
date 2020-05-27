import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CotarCrudService } from '../cotar.service';
import { CotarFormService } from '../cotar-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloCrudService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaCrudService } from '../../../cadastro/pessoa/pessoa.service';
import { Cotar } from '../../../comum/modelo/entidade/cotar';
import { EventoProduto } from '../../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../../comum/modelo/entidade/evento-pessoa';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { Produto } from '../../../comum/modelo/entidade/produto';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { UnidadeMedida } from '../../../comum/modelo/entidade/unidade-medida';
import { constante } from '../../../comum/constante';
import { unidadeMedidaListComparar } from '../../../comum/ferramenta/ferramenta-sistema';
import { EventoPessoaFuncao } from '../../../comum/modelo/entidade/evento-pessoa-funcao';
import { isNumber, adMime, removeMime } from '../../../comum/ferramenta/ferramenta-comum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm = this._formService.criarFormulario(new Cotar());

  public isEnviado = false;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  private eventoPessoaFuncao;

  public selecionaTab = 0;

  constructor(
    private _service: CotarCrudService,
    private _formService: CotarFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _produtoModeloService: ProdutoModeloCrudService,
    private _pessoaService: PessoaCrudService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      this._service.acao = !info.resolve.acao ? 'Novo' : info.resolve.acao;

      info.resolve.principal.subscribe((p: Cotar) => {
        if (p.eventoProdutoList) {
          p.eventoProdutoList.forEach((ep: EventoProduto) =>
            ep.produto.produtoModelo.foto = adMime(ep.produto.produtoModelo.foto)
          );
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

  get eventoPessoaList() {
    return this.frm.get('eventoPessoaList') as FormArray;
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

  public carregar(f: Cotar) {
    if (!f) {
      f = new Cotar();
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

  // GESTÃO DOS PRODUTOS A COTAR
  public displayFnEventoProduto(produtoModelo?: ProdutoModelo): string {
    return produtoModelo ? `${produtoModelo.nome} (${produtoModelo.codigo})` : '';
  }

  public pesquisarEventoProduto = '';

  public $filteredOptionsEventoProduto = new Promise((resolve, reject) => {
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
      this.eventoProdutoList.push(this._formService.criarFormularioEventoProduto(ep));
    }
    this.pesquisarEventoProduto = '';
  }

  public excluirEventoProduto(idx) {
    this.eventoProdutoList.removeAt(idx);
  }

  // GESTÃO DAS PESSOAS A COTAR
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

  public adicionarEventoPessoa() {
    const ep = new EventoPessoa();
    ep.eventoPessoaFuncao = this.eventoPessoaFuncao;
    ep.pessoa = (this.pesquisarEventoPessoa as unknown) as Pessoa;
    const id = ep.pessoa.id;
    let existe = false;
    this.eventoPessoaList.value.forEach(e => {
      if (e.pessoa.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.eventoPessoaList.push(this._formService.criarFormularioEventoPessoa(ep));
    }
    this.pesquisarEventoPessoa = '';
  }

  public excluirEventoPessoa(idx) {
    this.eventoPessoaList.removeAt(idx);
  }

  public filtrarCotacaoGenerica(eventoProduto: EventoProduto) {
    return !eventoProduto.eventoPessoa;
  }

  public filtrarCotacaoDefinida(eventoProduto: EventoProduto) {
    return eventoProduto.eventoPessoa;
  }

  public async gerarPlanilhaCotacao() {
    if ((this.frm.value.eventoPessoaList.length && !this.frm.value.eventoPessoaList[0].eventoProdutoList.length)
      || await this._mensagem.confirme('Confirme a geração da planilha')) {
      let ep = this.eventoProdutoList.value;
      for (let i = 0; i < ep.length; i++) {
        if (!isNumber(ep[i].quantidade) || ep[i].quantidade < 0.0000001) {
          this._mensagem.erro('Há produto(s) sem a quantidade a orçar definida');
          this.selecionaTab = 0;
          return;
        }
      }
      this.eventoPessoaList.controls.forEach(element => {
        ((element as FormGroup).controls.eventoProdutoList as FormArray).clear();
        this.eventoProdutoList.value.forEach(ep => {
          ((element as FormGroup).controls.eventoProdutoList as FormArray).push(this._formService.criarFormularioEventoProduto(ep, true));
        });
        (element as FormGroup).controls.eventoProdutoList.updateValueAndValidity();
      });
    }
  }

  public exibirAbaCotacaoPreco() {
    let e: Cotar = this.frm.value;
    return e && e.eventoPessoaList && e.eventoPessoaList.length &&
      e.eventoProdutoList && e.eventoProdutoList.length;
  }

  public exibirCotacaoPreco() {
    let e: Cotar = this.frm.value;
    return e && e.eventoPessoaList && e.eventoPessoaList.length &&
      e.eventoPessoaList[0].eventoProdutoList && e.eventoPessoaList[0].eventoProdutoList.length;
  }

  public unidadeMedidaListComparar(f1: UnidadeMedida, f2: UnidadeMedida) {
    return unidadeMedidaListComparar(f1, f2);
  }

}
