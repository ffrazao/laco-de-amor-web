import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoPessoaFuncaoCrudService } from './evento-pessoa-funcao.service';
import { EventoPessoaFuncaoFormService } from './evento-pessoa-funcao-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    EventoPessoaFuncaoCrudService,
    EventoPessoaFuncaoFormService,
  ]
})
export class EventoPessoaFuncaoModule { }
