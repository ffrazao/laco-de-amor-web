import { EventoPessoaFuncao } from './../../comum/modelo/entidade/evento-pessoa-funcao';
import { Injectable, Injector, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';
import { InjetorEstaticoService } from './../../comum/servico/injetor-estatico.service';
import { EventoPessoaFuncaoService } from './../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { EventoPessoa } from './../../comum/modelo/entidade/evento-pessoa';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';
import { Comprar } from '../../comum/modelo/entidade/comprar';
import { Evento } from '../../comum/modelo/entidade/evento';

@Injectable()
export class ComprarFormService extends EventoFormService {

  private _eventoPessoaFuncaoService: EventoPessoaFuncaoService;

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
    const injector: Injector = InjetorEstaticoService.injector;
    this._eventoPessoaFuncaoService = injector.get<EventoPessoaFuncaoService>(EventoPessoaFuncaoService as Type<EventoPessoaFuncaoService>);

  }

  public criarFormulario(entidade: Comprar): FormGroup {
    let result = super.criarFormulario(entidade as Evento);
    result.controls.eventoPessoaList.clearValidators();
    result.controls.eventoPessoaList.updateValueAndValidity();
    return result;
  }

  public criarFormularioEventoPessoa(entidade: EventoPessoa): FormGroup {
    let result = super.criarFormularioEventoPessoa(entidade);
    // identificar a pessoa como cliente
    result.controls.eventoPessoaFuncao.setValue(this._eventoPessoaFuncaoService.lista[2]);
    return result;
  }

  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    let result = super.criarFormularioEventoProduto(entidade, true);
    result.controls.eventoPessoa.setValidators([Validators.required]);
    return result;
  }

}
