import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprarRoutingModule } from './comprar-routing.module';
import { ComprarComponent } from './comprar.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { ComprarService } from './comprar.service';
import { ComprarFormService } from './comprar-form.service';
import { UnidadeMedidaModule } from 'src/app/cadastro/unidade-medida/unidade-medida.module';
import { CotarModule } from '../cotar/cotar.module';


@NgModule({
  declarations: [ComprarComponent],
  imports: [
    CommonModule,
    ComprarRoutingModule,
    CotarModule,
    UnidadeMedidaModule,
  ],
  providers: [
    ComprarService,
    ComprarFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class ComprarModule { }
