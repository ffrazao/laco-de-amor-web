import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoFormService } from '../evento/evento-form.service';
import { EventoProduto } from 'src/app/comum/entidade/modelo/evento-produto';
import { Utilizar } from 'src/app/comum/entidade/modelo/utilizar';
import { Evento } from 'src/app/comum/entidade/modelo/evento';

@Injectable()
export class UtilizarFormService extends EventoFormService {

  private _eventoPessoaFuncaoService;

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormulario(entidade: Utilizar): FormGroup {
    let result = super.criarFormulario(entidade as Evento);
    result.controls.eventoPessoaList.clearValidators();
    result.controls.eventoPessoaList.updateValueAndValidity();
    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    let result = super.criarFormularioEventoProduto(entidade, true);
    result.controls.eventoPessoa.setValidators([Validators.required]);
    return result;
  }

}
