import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FiltroRoutingModule } from './filtro-routing.module';
import { FiltroComponent } from './filtro.component';


@NgModule({
  declarations: [FiltroComponent],
  imports: [
    CommonModule,
    FiltroRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FiltroModule { }
