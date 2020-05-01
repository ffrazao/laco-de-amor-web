import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoService } from './evento.service';
import { EventoFormService } from './evento-form.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    EventoService,
    EventoFormService,
  ]
})
export class EventoModule { }
