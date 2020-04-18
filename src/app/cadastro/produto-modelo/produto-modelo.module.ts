import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoModeloComponent } from './produto-modelo.component';
import { ProdutoModeloRoutingModule } from './produto-modelo-routing.module';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';


@NgModule({
  declarations: [ProdutoModeloComponent],
  imports: [
    CommonModule,
    ProdutoModeloRoutingModule
  ],
  providers: [
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]
})
export class ProdutoModeloModule { }
