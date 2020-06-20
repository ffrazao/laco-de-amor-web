import { ProdutoPreco } from './../../comum/modelo/entidade/produto-preco';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

import { Evento } from '../../comum/modelo/entidade/evento';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';
import { EventoPessoa } from '../../comum/modelo/entidade/evento-pessoa';
import { EventoFiltroDTO } from 'src/app/comum/modelo/dto/evento.filtro.dto';
import { Produto } from 'src/app/comum/modelo/entidade/produto';
import { isNumber, data } from '../../comum/ferramenta/ferramenta-comum';

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
        paiId: [entidade?.pai?.id, []],
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
      lista.forEach(ep => result.push(this.criarFormularioEventoProduto(ep)));
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioEventoPessoaList(lista: EventoPessoa[]): FormArray {
    const result = [];
    if (lista && lista.length) {
      lista.forEach(ep => result.push(this.criarFormularioEventoPessoa(ep)));
    }
    return this._formBuilder.array(result);
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    if (!entidade) {
      entidade = new EventoProduto();
    }
    const result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        produto: [entidade.produto, [Validators.required]],
        quantidade: [entidade.quantidade, [Validators.required, Validators.min(0.001)]],
        unidadeMedida: [entidade.unidadeMedida, [Validators.required]],
        valorUnitario: [entidade.valorUnitario, [Validators.min(0.01)]],
        valorTotal: [this.multiplicaValores(entidade.quantidade, entidade.valorUnitario), [Validators.min(0.01)]],
        eventoPessoa: [entidade.eventoPessoa, []],
      }
    );

    if (cotacao) {
      result.controls.valorUnitario.setValidators([Validators.min(0.01), Validators.required]);
      result.controls.valorTotal.setValidators([Validators.min(0.01), Validators.required]);
    }

    result.valueChanges.subscribe(v => {
      result.controls.valorTotal.setValue(this.multiplicaValores(v.quantidade, v.valorUnitario), { emitEvent: false });
    });

    return result;
  }

  public multiplicaValores(a, b) {
    return (a && b && isNumber(a) && isNumber(b)) ? a * b : null;
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

  public adicionaProdutoList(frm: FormGroup, prod: Produto) {
    if (!frm['produtoList']) {
      frm['produtoList'] = [];
    }
    let existe = false;
    for (let i = 0; i < frm['produtoList'].length; i++) {
      if (frm['produtoList'][i].produtoModelo.id === prod.produtoModelo.id) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      frm['produtoList'].push(prod);
    }
  }

  public configProdutoList(result) {
    result['produtoList'] = [];
    if (result.controls.eventoProdutoList.value) {
      result.controls.eventoProdutoList.value.forEach(ep => {
        this.adicionaProdutoList(result, ep.produto);
      });
    }
    return result;
  }

  public calculaOrcamento(lista: EventoProduto[]): number {
    let total = 0;
    if (lista && lista.length) {
      lista.forEach(item => {
        if (item.valorTotal && isNumber(item.valorTotal)) {
          total += item.valorTotal;
        }
      });
    }
    return total;
  }

  public calcularValoresCotacao(c: Evento): ResultadoValoresCotacao {
    let menor = 0;
    let media = 0;
    let maior = 0;
    if (c.eventoPessoaList && c.eventoPessoaList.length) {
      let totalGeral = 0;
      for (let i = 0; i < c.eventoPessoaList.length; i++) {
        let total = 0;
        if (c.eventoPessoaList[i].eventoProdutoList && c.eventoPessoaList[i].eventoProdutoList.length) {
          for (let j = 0; j < c.eventoPessoaList[i].eventoProdutoList.length; j++) {
            let p: EventoProduto = c.eventoPessoaList[i].eventoProdutoList[j];
            total += p.quantidade * p.valorUnitario;
          }
        }
        if (i === 0) {
          menor = total;
          maior = total;
        } else {
          menor = menor < total ? menor : total;
          maior = total > maior ? total : maior;
        }
        totalGeral += total;
      }
      media = totalGeral / c.eventoPessoaList.length;
    }
    return {
      menor,
      media,
      maior,
    };
  }

  public calculaMenorPreco(produto: Produto, produtoPrecoList: ProdutoPreco[]) {
    const hoje = new Date();
    let maior = null;
    let result = null;
    if (produto && produtoPrecoList) {
      for (let i = 0; i <= produtoPrecoList.length; i++) {
        const pp = produtoPrecoList[i];
        if (pp && pp.destinacao === 'Venda') {
          const vigencia = data(pp.vigencia);
          if (!maior || maior.getTime() < vigencia.getTime()) {
            if (vigencia.getTime() <= hoje.getTime()) {
                result = produtoPrecoList[i].valor;
                maior = vigencia;
            }
          }
        }
      }
    }
    return result;
  }

}

export class ResultadoValoresCotacao {
  menor = 0;
  media = 0;
  maior = 0;
}


