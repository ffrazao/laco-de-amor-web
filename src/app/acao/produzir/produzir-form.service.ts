import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { Produzir } from '../../comum/modelo/entidade/produzir';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';

@Injectable()
export class ProduzirFormService extends EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormulario(entidade: Produzir): FormGroup {
    let result = super.criarFormulario(entidade as Evento);
    result.controls.eventoPessoaList.clearValidators();
    result.controls.eventoPessoaList.updateValueAndValidity();

    result = super.configProdutoList(result);

    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    const result = super.criarFormularioEventoProduto(entidade, true);
    result.controls.eventoPessoa.setValidators([Validators.required]);
    result.controls.valorUnitario.clearValidators();
    result.controls.valorUnitario.updateValueAndValidity();
    result.controls.valorTotal.clearValidators();
    result.controls.valorTotal.updateValueAndValidity();
    return result;
  }

}
