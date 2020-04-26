import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { MensagemService } from '../../../comum/servico/mensagem/mensagem.service';
import { Cotar } from '../../../comum/entidade/modelo/cotar';
import { CotarService } from '../cotar.service';
import { EventoProduto } from '../../../comum/entidade/modelo/evento-produto';
import { EventoPessoa } from '../../../comum/entidade/modelo/evento-pessoa';
import { environment } from '../../../../environments/environment';

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
  
  headElementsEventoProduto = [
    'foto', 'nome', 'codigo', 'acao',
  ];
  elementsEventoProduto: EventoProduto[] = [];
  dataSourceEventoProduto = new MatTableDataSource(this.elementsEventoProduto);

  headElementsEventoPessoa = [
    'nome', 'tipo', 'cpfCnpj', 'acao',
  ];
  elementsEventoPessoa: EventoPessoa[] = [];
  dataSourceEventoPessoa = new MatTableDataSource(this.elementsEventoPessoa);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private servico: CotarService,
    private router: Router,
    private _mensagem: MensagemService,
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

  applyFilterEventoProduto(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventoProduto.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEventoPessoa(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventoPessoa.filter = filterValue.trim().toLowerCase();
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
    this.dataSourceEventoProduto = new MatTableDataSource(entidade.eventoProdutoList);
    this.dataSourceEventoPessoa = new MatTableDataSource(entidade.eventoPessoaList);

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

}
