import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenderRoutingModule } from './vender-routing.module';
import { VenderComponent } from './vender.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { VenderService } from './vender.service';
import { VenderFormService } from './vender-form.service';
import { UnidadeMedidaModule } from '../../cadastro/unidade-medida/unidade-medida.module';
import { CotarModule } from '../cotar/cotar.module';
import { EventoPessoaFuncaoModule } from '../evento-pessoa-funcao/evento-pessoa-funcao.module';


@NgModule({
  declarations: [VenderComponent],
  imports: [
    CommonModule,
    VenderRoutingModule,
    CotarModule,
    UnidadeMedidaModule,
    EventoPessoaFuncaoModule,
  ],
  providers: [
    VenderService,
    VenderFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class VenderModule { }
