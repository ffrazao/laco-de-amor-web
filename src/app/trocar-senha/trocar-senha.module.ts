import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrocarSenhaRoutingModule } from './trocar-senha-routing.module';
import { TrocarSenhaComponent } from './trocar-senha.component';


@NgModule({
  declarations: [TrocarSenhaComponent],
  imports: [
    CommonModule,
    TrocarSenhaRoutingModule
  ]
})
export class TrocarSenhaModule { }
