import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoCrudService } from './evento.service';
import { EventoFormService } from './evento-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    EventoCrudService,
    EventoFormService,
  ]
})
export class EventoModule { }
