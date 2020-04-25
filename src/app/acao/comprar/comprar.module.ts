import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprarRoutingModule } from './comprar-routing.module';
import { ComprarComponent } from './comprar.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';


@NgModule({
  declarations: [ComprarComponent],
  imports: [
    CommonModule,
    ComprarRoutingModule
  ],
  providers: [
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class ComprarModule { }
