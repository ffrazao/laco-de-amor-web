import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoPessoaFuncaoService } from './evento-pessoa-funcao.service';
import { EventoPessoaFuncaoFormService } from './evento-pessoa-funcao-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    EventoPessoaFuncaoService,
    EventoPessoaFuncaoFormService,
  ]
})
export class EventoPessoaFuncaoModule { }
