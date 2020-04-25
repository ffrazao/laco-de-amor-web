import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotarRoutingModule } from './cotar-routing.module';
import { CotarComponent } from './cotar.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';


@NgModule({
  declarations: [CotarComponent],
  imports: [
    CommonModule,
    CotarRoutingModule
  ],
  providers: [
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class CotarModule { }
