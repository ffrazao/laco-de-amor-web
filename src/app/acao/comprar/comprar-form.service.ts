import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoFormService } from '../evento/evento-form.service';
import { EventoProduto } from 'src/app/comum/entidade/modelo/evento-produto';
import { Comprar } from 'src/app/comum/entidade/modelo/comprar';
import { Evento } from 'src/app/comum/entidade/modelo/evento';

@Injectable()
export class ComprarFormService extends EventoFormService {

  private _eventoPessoaFuncaoService;

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormulario(entidade: Comprar): FormGroup {
    let result = super.criarFormulario(entidade as Evento);
    result.controls.eventoPessoaList.setValidators([]);
    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    let result = super.criarFormularioEventoProduto(entidade, true);
    result.controls.eventoPessoa.setValidators(Validators.required);
    return result;
  }

}
