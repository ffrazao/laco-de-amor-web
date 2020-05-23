import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoModeloRoutingModule } from './produto-modelo-routing.module';
import { ProdutoModeloComponent } from './produto-modelo.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { ProdutoModeloCrudService } from './produto-modelo.service';
import { ProdutoModeloFormService } from './produto-modelo-form.service';
import { ProdutoAtributoModule } from '../produto-atributo/produto-atributo.module';


@NgModule({
  declarations: [ProdutoModeloComponent],
  imports: [
    CommonModule,
    ProdutoModeloRoutingModule,
    ProdutoAtributoModule,
  ],
  providers: [
    ProdutoModeloCrudService,
    ProdutoModeloFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]
})
export class ProdutoModeloModule { }
