import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { constante } from '../../../comum/constante';
import { VenderCrudService } from '../vender.service';
import { VenderFormService } from '../vender-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloCrudService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaCrudService } from '../../../cadastro/pessoa/pessoa.service';
import { Vender } from '../../../comum/modelo/entidade/vender';
import { EventoProduto } from '../../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../../comum/modelo/entidade/evento-pessoa';
import { Produto } from '../../../comum/modelo/entidade/produto';
import { ProdutoModelo } from '../../../comum/modelo/entidade/produto-modelo';
import { UnidadeMedida } from '../../../comum/modelo/entidade/unidade-medida';
import { Pessoa } from '../../../comum/modelo/entidade/pessoa';
import { Endereco } from './../../../comum/modelo/entidade/endereco';
import {
  eventoPessoaListComparar,
  unidadeMedidaListComparar,
  eventoProdutoListComparar,
  pessoaListComparar,
  pessoaEnderecoListComparar
} from '../../../comum/ferramenta/ferramenta-sistema';
import { EventoPessoaFuncao } from '../../../comum/modelo/entidade/evento-pessoa-funcao';
import { adMime, removeMime, data } from '../../../comum/ferramenta/ferramenta-comum';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public prod = environment.production;

  public frm = this._formService.criarFormulario(new Vender());

  public isEnviado = false;
  public id: number;

  public SEM_IMAGEM = constante.SEM_IMAGEM;

  public unidadeMedidaList: UnidadeMedida[] = [];
  private eventoPessoaFuncao;
  public eventoProdutoEditando = false;

  constructor(
    private _service: VenderCrudService,
    private _formService: VenderFormService,
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
      info.resolve.principal.subscribe((p: Vender) => {
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

  public carregar(f: Vender) {
    if (!f) {
      f = new Vender();
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

  public pessoaEnderecoListComparar(o1: Endereco, o2: Endereco) {
    return pessoaEnderecoListComparar(o1, o2);
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
          this._produtoModeloService.filtro.materiaPrima = 'N';
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

  public adicionarEventoProduto(fg: FormGroup) {

    const produto = new Produto();
    produto.produtoModelo = (this.pesquisarEventoProduto as unknown) as ProdutoModelo;

    const id = produto.produtoModelo.id;
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
    this.produtoMudou(produto, fg);
  }

  public filtrarCotacaoGenerica(eventoProduto: EventoProduto) {
    return !eventoProduto.eventoPessoa;
  }
  public displayFnEventoPessoa(pessoa?: Pessoa): string {
    return pessoa ? `${pessoa.nome} (${pessoa.cpfCnpj})` : '';
  }

  public pesquisarEventoPessoa = '';

  public $filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
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
        if (typeof this.frm.value.eventoPessoaList[0].pessoa === 'string' && this.frm.value.eventoPessoaList[0].pessoa.length) {
          this._pessoaService.filtro.nome = this.frm.value.eventoPessoaList[0].pessoa;
          this._pessoaService.filtro.cpfCnpj = this.frm.value.eventoPessoaList[0].pessoa;
          this._pessoaService.filtro.pessoaVinculoTipo = ['CLIENTE'];
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

  public produtoMudou(produto, linha: FormGroup | object) {
    const valor = this._formService.calculaMenorPreco(produto, produto.produtoModelo.produtoPrecoList);
    if (valor) {
      if (linha instanceof FormGroup) {
        linha.get('valorUnitario').setValue(valor);
        linha.updateValueAndValidity();
      } else {
        linha['valorUnitario'].setValue(valor);
      }
    }
  }

}
