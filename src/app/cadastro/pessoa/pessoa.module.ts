import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';


@NgModule({
  declarations: [PessoaComponent],
  imports: [
    CommonModule,
    PessoaRoutingModule
  ],
  exports: [    
  ],
  providers: [
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]
})
export class PessoaModule { }
