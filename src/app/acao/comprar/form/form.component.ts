import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { ComprarService } from '../comprar.service';
import { ComprarFormService } from '../comprar-form.service';
import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { ProdutoModeloService } from '../../../cadastro/produto-modelo/produto-modelo.service';
import { PessoaService } from '../../../cadastro/pessoa/pessoa.service';
import { Comprar } from '../../../comum/entidade/modelo/comprar';
import { EventoProduto } from '../../../comum/entidade/modelo/evento-produto';
import { EventoPessoa } from '../../../comum/entidade/modelo/evento-pessoa';
import { EventoPessoaFuncao } from '../../../comum/entidade/modelo/evento-pessoa-funcao';
import { ProdutoModelo } from '../../../comum/entidade/modelo/produto-modelo';
import { Produto } from '../../../comum/entidade/modelo/produto';
import { Pessoa } from '../../../comum/entidade/modelo/pessoa';
import { UnidadeMedida } from '../../../comum/entidade/modelo/unidade-medida';
import { isNumber } from '../../../comum/ferramenta/ferramenta';
import { Cotar } from 'src/app/comum/entidade/modelo/cotar';
import { CotarService } from '../../cotar/cotar.service';

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
  public acao: string;
  
  public SEM_IMAGEM = environment.SEM_IMAGEM;
  
  public unidadeMedidaList: UnidadeMedida[] = [];
  public cotacao;
  public cotacaoList: Cotar[] = [];

  public selecionaTab = 0;

  constructor(
    private _service: ComprarService,
    private _serviceFormService: ComprarFormService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _mensagem: MensagemService,
    private _produtoModeloService: ProdutoModeloService,
    private _pessoaService: PessoaService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(p => {
      this.id = p.id;
    });

    this._route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this._serviceFormService.criarFormulario(this.entidade);

      this.unidadeMedidaList = info['resolve']['apoio'][0];
      this.cotacaoList = info['resolve']['apoio'][1];
    });
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
      let msg = 'Dados inválidos!';
      this._mensagem.erro(msg);
      throw new Error(msg);
    }

    this.entidade = this.frm.value;
    if ('Novo' === this.acao) {
      this._service.create(this.entidade);
      this._router.navigate(['acao', 'cotar', this.entidade.id]);
    } else {
      this._service.update(this.id, this.entidade);
      this._router.navigate(['acao', 'cotar']);
    }
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

  public adicionarEventoPessoa() {
    let ep = new EventoPessoa();
    ep.eventoPessoaFuncao = new EventoPessoaFuncao(); ////////////////////////////////////////////////////////////
    ep.pessoa = (this.pesquisarEventoPessoa as unknown) as Pessoa;
    let id = ep.pessoa.id;
    let existe = false;
    this.eventoPessoaList.value.forEach(e => {
      if (e.pessoa.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.eventoPessoaList.push(this._serviceFormService.criarFormularioEventoPessoa(ep));
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
    let gerarPlanilha = await this._mensagem.confirme('Confirme a geração da planilha');
    if (gerarPlanilha) {
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
          ((element as FormGroup).controls.eventoProdutoList as FormArray).push(this._serviceFormService.criarFormularioEventoProduto(ep, true));
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

}
