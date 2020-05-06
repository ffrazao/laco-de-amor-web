import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduzirRoutingModule } from './produzir-routing.module';
import { ProduzirComponent } from './produzir.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { ProduzirService } from './produzir.service';
import { ProduzirFormService } from './produzir-form.service';
import { UnidadeMedidaModule } from '../../cadastro/unidade-medida/unidade-medida.module';
import { CotarModule } from '../cotar/cotar.module';
import { EventoPessoaFuncaoModule } from '../evento-pessoa-funcao/evento-pessoa-funcao.module';


@NgModule({
  declarations: [ProduzirComponent],
  imports: [
    CommonModule,
    ProduzirRoutingModule,
    CotarModule,
    UnidadeMedidaModule,
    EventoPessoaFuncaoModule,
  ],
  providers: [
    ProduzirService,
    ProduzirFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class ProduzirModule { }
