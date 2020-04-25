import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduzirRoutingModule } from './produzir-routing.module';
import { ProduzirComponent } from './produzir.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';


@NgModule({
  declarations: [ProduzirComponent],
  imports: [
    CommonModule,
    ProduzirRoutingModule
  ],
  providers: [
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class ProduzirModule { }
