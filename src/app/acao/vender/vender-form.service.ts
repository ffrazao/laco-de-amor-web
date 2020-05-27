import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { Vender } from '../../comum/modelo/entidade/vender';
import { EventoPessoa } from '../../comum/modelo/entidade/evento-pessoa';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';

@Injectable()
export class VenderFormService extends EventoFormService {

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
  }

  public criarFormulario(entidade: Vender): FormGroup {
    let result = super.criarFormulario(entidade as Evento);
    result.addControl('endereco', this._formBuilder.control(entidade.endereco, [Validators.required]));

    // adicionar o cliente
    let eventoPessoaList: EventoPessoa[] = (result.controls.eventoPessoaList.value as EventoPessoa[]);
    if (!eventoPessoaList || !eventoPessoaList.length) {
      eventoPessoaList = [];
    }
    if (eventoPessoaList.length < 1) {
      const ep = new EventoPessoa();
      eventoPessoaList.push(ep);
    }

    result = super.configProdutoList(result);

    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    const result = super.criarFormularioEventoProduto(entidade, true);
    return result;
  }

}
