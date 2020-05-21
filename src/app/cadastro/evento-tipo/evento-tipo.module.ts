import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoTipoCrudService } from './evento-tipo.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [
    EventoTipoCrudService
  ]
})
export class EventoTipoModule { }
