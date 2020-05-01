import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoFormService } from '../evento/evento-form.service';
import { EventoProduto } from 'src/app/comum/entidade/modelo/evento-produto';

@Injectable()
export class ComprarFormService extends EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    let result = super.criarFormularioEventoProduto(entidade, true);
    return result;
  }

}
