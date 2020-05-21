import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilizarRoutingModule } from './utilizar-routing.module';
import { UtilizarComponent } from './utilizar.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { UtilizarCrudService } from './utilizar.service';
import { UtilizarFormService } from './utilizar-form.service';
import { UnidadeMedidaModule } from '../../cadastro/unidade-medida/unidade-medida.module';
import { CotarModule } from '../cotar/cotar.module';
import { EventoPessoaFuncaoModule } from '../evento-pessoa-funcao/evento-pessoa-funcao.module';


@NgModule({
  declarations: [UtilizarComponent],
  imports: [
    CommonModule,
    UtilizarRoutingModule,
    CotarModule,
    UnidadeMedidaModule,
    EventoPessoaFuncaoModule,
  ],
  providers: [
    UtilizarCrudService,
    UtilizarFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class UtilizarModule { }
