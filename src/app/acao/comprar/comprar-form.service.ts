import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { Comprar } from '../../comum/modelo/entidade/comprar';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';

@Injectable()
export class ComprarFormService extends EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormulario(entidade: Comprar): FormGroup {
    const result = super.criarFormulario(entidade as Evento);
    result.controls.eventoPessoaList.clearValidators();
    result.controls.eventoPessoaList.updateValueAndValidity();
    
    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    const result = super.criarFormularioEventoProduto(entidade, true);
    result.controls.eventoPessoa.setValidators([Validators.required]);
    return result;
  }

}
