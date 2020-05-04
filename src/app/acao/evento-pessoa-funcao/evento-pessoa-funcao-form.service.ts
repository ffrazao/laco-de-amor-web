import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

import { EventoPessoaFuncao } from '../../comum/entidade/modelo/evento-pessoa-funcao';

@Injectable()
export class EventoPessoaFuncaoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
  }

  public criarFormulario(entidade: EventoPessoaFuncao): FormGroup {
    if (!entidade) {
      entidade = new EventoPessoaFuncao();
    }

    let result = this._formBuilder.group(
      {
        id: [entidade.id, []],
        nome: [entidade.nome, [Validators.required]],
        codigo: [entidade.codigo, [Validators.required]],
      }
    );

    return result;
  }

}
