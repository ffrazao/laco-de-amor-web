import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenderRoutingModule } from './vender-routing.module';
import { VenderComponent } from './vender.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { VenderCrudService } from './vender.service';
import { VenderFormService } from './vender-form.service';
import { UnidadeMedidaModule } from '../../cadastro/unidade-medida/unidade-medida.module';
import { EventoTipoModule } from '../../cadastro/evento-tipo/evento-tipo.module';
import { ProdutoModeloModule } from '../../cadastro/produto-modelo/produto-modelo.module';
import { PessoaModule } from '../../cadastro/pessoa/pessoa.module';
import { EventoPessoaFuncaoModule } from '../evento-pessoa-funcao/evento-pessoa-funcao.module';


@NgModule({
  declarations: [VenderComponent],
  imports: [
    CommonModule,
    VenderRoutingModule,
    UnidadeMedidaModule,
    EventoTipoModule,
    ProdutoModeloModule,
    PessoaModule,
    EventoPessoaFuncaoModule,
  ],
  providers: [
    VenderCrudService,
    VenderFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]
})
export class VenderModule { }
