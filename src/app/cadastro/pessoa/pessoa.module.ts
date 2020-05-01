import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { PessoaService } from './pessoa.service';
import { PessoaFormService } from './pessoa-form.service';


@NgModule({
  declarations: [PessoaComponent],
  imports: [
    CommonModule,
    PessoaRoutingModule
  ],
  exports: [
  ],
  providers: [
    PessoaService,
    PessoaFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve,
  ]

})
export class PessoaModule { }
