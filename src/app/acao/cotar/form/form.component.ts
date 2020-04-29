import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Cotar } from '../../../comum/entidade/modelo/cotar';
import { CotarService } from '../cotar.service';
import { EventoProduto } from '../../../comum/entidade/modelo/evento-produto';
import { EventoPessoa } from '../../../comum/entidade/modelo/evento-pessoa';
import { environment } from '../../../../environments/environment';
import { ProdutoModelo } from 'src/app/comum/entidade/modelo/produto-modelo';
import { ProdutoModeloService } from 'src/app/cadastro/produto-modelo/produto-modelo.service';
import { Produto } from 'src/app/comum/entidade/modelo/produto';
import { Pessoa } from 'src/app/comum/entidade/modelo/pessoa';
import { PessoaService } from 'src/app/cadastro/pessoa/pessoa.service';
import { EventoPessoaFuncao } from 'src/app/comum/entidade/modelo/evento-pessoa-funcao';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public frm = this.criarFormulario(new Cotar());

  public isEnviado = false;
  public entidade: Cotar;
  public id: number;
  public acao: string;

  public SEM_IMAGEM = environment.SEM_IMAGEM;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: CotarService,
    private router: Router,
    private _mensagem: MensagemService,
    private produtoModeloService: ProdutoModeloService,
    private pessoaService: PessoaService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p.id;
    });

    this.route.data.subscribe((info) => {
      this.entidade = info['resolve']['principal'];
      this.acao = !info['resolve']['acao'] ? 'Novo' : info['resolve']['acao'];
      this.frm = this.criarFormulario(this.entidade);
    });
  }

  get eventoProdutoList() {
    return this.frm.get('eventoProdutoList') as FormArray;
  }

  get eventoPessoaList() {
    return this.frm.get('eventoPessoaList') as FormArray;
  }

  criarFormulario(entidade: Cotar) {
    if (!entidade) {
      entidade = new Cotar();
    }

    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        data: [entidade.data, [Validators.required]],
        eventoTipo: [entidade.eventoTipo, [Validators.required]],
        pai: [entidade.pai, []],
        eventoProdutoList: this.criarFormularioEventoProdutoList(entidade.eventoProdutoList),
        eventoPessoaList: this.criarFormularioEventoPessoaList(entidade.eventoPessoaList),
      }
    );

    return result;
  }

  public criarFormularioEventoProdutoList(lista: EventoProduto[]): FormArray {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioEventoProduto(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  public criarFormularioEventoPessoaList(lista: EventoPessoa[]): FormArray {
    let result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioEventoPessoa(lista[i]));
      }
    }
    return this.formBuilder.array(result);
  }

  public criarFormularioEventoProduto(entidade: EventoProduto): FormGroup {
    if (!entidade) {
      entidade = new EventoProduto();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        produto: [entidade.produto, [Validators.required]],
        quantidade: [entidade.quantidade, [Validators.required]],
        unidadeMedida: [entidade.unidadeMedida, [Validators.required]],
        valorUnitario: [entidade.valorUnitario, [Validators.required]],
        valorTotal: [entidade.valorTotal, [Validators.required]],
        pessoa: [entidade.pessoa, []],
      }
    );
    return result;
  }

  public criarFormularioEventoPessoa(entidade: EventoPessoa): FormGroup {
    if (!entidade) {
      entidade = new EventoPessoa();
    }
    let result = this.formBuilder.group(
      {
        id: [entidade.id, []],
        pessoa: [entidade.pessoa, [Validators.required]],
        eventoPessoaFuncao: [entidade.eventoPessoaFuncao, [Validators.required]],
      }
    );
    return result;
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
      this.servico.create(this.entidade);
      this.router.navigate(['acao', 'cotar', this.entidade.id]);
    } else {
      this.servico.update(this.id, this.entidade);
      this.router.navigate(['acao', 'cotar']);
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
    console.log(event.target['value'], this.pesquisarEventoProduto);
    this.$filteredOptionsEventoProduto = new Promise((resolve, reject) => {
      let result = [];
      if (typeof this.pesquisarEventoProduto === 'string') {
        this.produtoModeloService.lista.forEach(val => {
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

  public podeAdicionarEventoProduto() {
    return typeof this.pesquisarEventoProduto === 'string';
  }

  public adicionarEventoProduto() {
    let ep = new EventoProduto();
    ep.produto = new Produto();
    ep.produto.produtoModelo = (this.pesquisarEventoProduto as unknown) as ProdutoModelo;
    let id = ep.produto.produtoModelo.id;
    let existe = false;
    this.frm.get('eventoProdutoList').value.forEach(e => {
      if (e.produto.produtoModelo.id === id) {
        existe = true;
      }
    });
    if (existe) {
      this._mensagem.erro('Item já cadastrado!');
    } else {
      this.eventoProdutoList.push(this.criarFormularioEventoProduto(ep));
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
    console.log(event.target['value'], this.pesquisarEventoPessoa);
    this.$filteredOptionsEventoPessoa = new Promise((resolve, reject) => {
      let result = [];
      if (typeof this.pesquisarEventoPessoa === 'string') {
        this.pessoaService.lista.forEach(val => {
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

  public podeAdicionarEventoPessoa() {
    return typeof this.pesquisarEventoPessoa === 'string';
  }

  public adicionarEventoPessoa() {
    let ep = new EventoPessoa();
    ep.eventoPessoaFuncao = new EventoPessoaFuncao(); ////////////////////////////////////////////////////////////
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
      this.eventoPessoaList.push(this.criarFormularioEventoPessoa(ep));
    }
    this.pesquisarEventoPessoa = '';
  }

  public excluirEventoPessoa(idx) {
    this.eventoPessoaList.removeAt(idx);
  }

}
