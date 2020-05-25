import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../comum/modelo/entidade/evento-pessoa';
import { isNumber } from '../../comum/ferramenta/ferramenta-comum';
import { Evento } from '../../comum/modelo/entidade/evento';
import { EventoFiltroDTO } from 'src/app/comum/modelo/dto/evento.filtro.dto';

@Injectable()
export class EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: Evento): FormGroup {
    if (!entidade) {
      entidade = new Evento();
    }

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        data: [entidade.data, [Validators.required]],
        eventoTipo: [entidade.eventoTipo, [Validators.required]],
        pai: [entidade.pai, []],
        eventoProdutoList: this.criarFormularioEventoProdutoList(entidade.eventoProdutoList),
        eventoPessoaList: this.criarFormularioEventoPessoaList(entidade.eventoPessoaList),
        eventoProdutoListTotal: [this.calculaOrcamento(entidade.eventoProdutoList), []],
      }
    );
    result.controls.eventoProdutoList.setValidators([Validators.required]);
    result.controls.eventoPessoaList.setValidators([Validators.required]);

    result.valueChanges.subscribe(v => {
      result.controls.eventoProdutoListTotal.setValue(this.calculaOrcamento(v.eventoProdutoList), { emitEvent: false });
    });

    return result;
  }

  public criarFormularioEventoProdutoList(lista: EventoProduto[]): FormArray {
    const result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioEventoProduto(lista[i]));
      }
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioEventoPessoaList(lista: EventoPessoa[]): FormArray {
    const result = [];

    if (lista && lista.length) {
      for (let i = 0; i < lista.length; i++) {
        result.push(this.criarFormularioEventoPessoa(lista[i]));
      }
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    if (!entidade) {
      entidade = new EventoProduto();
    }

    const obrigatorio = cotacao ? [Validators.required] : [];

    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        produto: [entidade.produto, [Validators.required]],
        quantidade: [entidade.quantidade, [Validators.required]],
        unidadeMedida: [entidade.unidadeMedida, [Validators.required]],
        valorUnitario: [entidade.valorUnitario, obrigatorio],
        valorTotal: [entidade.valorTotal, obrigatorio],
        eventoPessoa: [entidade.eventoPessoa, []],
      }
    );

    if (cotacao) {
      result.valueChanges.subscribe(v => {
        if (v.quantidade && v.valorUnitario) {
          result.get('valorTotal').setValue(v.quantidade * v.valorUnitario, { emitEvent: false });
        }
      });
    }
    return result;
  }

  public criarFormularioEventoPessoa(entidade: EventoPessoa): FormGroup {
    if (!entidade) {
      entidade = new EventoPessoa();
    }
    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        pessoa: [entidade.pessoa, [Validators.required]],
        eventoPessoaFuncao: [entidade.eventoPessoaFuncao, [Validators.required]],
        eventoProdutoList: this.criarFormularioEventoProdutoList(entidade.eventoProdutoList),
        eventoProdutoListTotal: [this.calculaOrcamento(entidade.eventoProdutoList), []],
      }
    );

    result.valueChanges.subscribe(v => {
      result.controls.eventoProdutoListTotal.setValue(this.calculaOrcamento(v.eventoProdutoList), { emitEvent: false });
    });

    return result;
  }

  public criarFormularioFiltro(entidade: EventoFiltroDTO) {
    if (!entidade) {
      entidade = new EventoFiltroDTO();
    }
    const result = this._formBuilder.group(
      {
        dataInicio: [entidade.dataInicio, []],
        dataTermino: [entidade.dataTermino, []],
        produto: [entidade.produto, []],
        participante: [entidade.participante, []],
      }
    );
    return result;
  }


  private calculaOrcamento(lista: EventoProduto[]): number {
    let total = 0;
    if (lista && lista.length) {
      lista.forEach(vv => {
        if (isNumber(vv.valorTotal)) {
          total += vv.valorTotal;
        }
      });
    }
    return total;
  }

}
