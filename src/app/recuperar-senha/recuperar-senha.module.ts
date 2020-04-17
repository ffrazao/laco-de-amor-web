import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperarSenhaRoutingModule } from './recuperar-senha-routing.module';
import { RecuperarSenhaComponent } from './recuperar-senha.component';


@NgModule({
  declarations: [RecuperarSenhaComponent],
  imports: [
    CommonModule,
    RecuperarSenhaRoutingModule
  ]
})
export class RecuperarSenhaModule { }
