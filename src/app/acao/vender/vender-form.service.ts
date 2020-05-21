import { InjetorEstaticoService } from './../../comum/servico/injetor-estatico.service';
import { Injectable, Injector, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventoFormService } from '../evento/evento-form.service';
import { EventoPessoaFuncaoCrudService } from './../evento-pessoa-funcao/evento-pessoa-funcao.service';
import { Evento } from '../../comum/modelo/entidade/evento';
import { Vender } from '../../comum/modelo/entidade/vender';
import { EventoPessoa } from '../../comum/modelo/entidade/evento-pessoa';
import { EventoProduto } from '../../comum/modelo/entidade/evento-produto';
import { Produto } from '../../comum/modelo/entidade/produto';

@Injectable()
export class VenderFormService extends EventoFormService {

  private _eventoPessoaFuncaoService: EventoPessoaFuncaoCrudService;

  constructor(
    protected _formBuilder: FormBuilder,
  ) {
    super(_formBuilder);
    const injector: Injector = InjetorEstaticoService.injector;
    this._eventoPessoaFuncaoService = injector.get<EventoPessoaFuncaoCrudService>(EventoPessoaFuncaoCrudService as Type<EventoPessoaFuncaoCrudService>);
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
      let ep = new EventoPessoa();
      ep.eventoPessoaFuncao = this._eventoPessoaFuncaoService.lista[2];
      eventoPessoaList.push(ep);
    }

    result['produtoList'] = [];
    if (result.controls.eventoProdutoList.value) {
      result.controls.eventoProdutoList.value.forEach(ep => {
        this.adicionaProdutoList(result, ep.produto);
      });
    }

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
  public criarFormularioEventoProduto(entidade: EventoProduto, cotacao: boolean = false): FormGroup {
    let result = super.criarFormularioEventoProduto(entidade, true);
    return result;
  }

}
