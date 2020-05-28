import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomService } from './dom.service';
import { ConsultaCepService } from './consulta-cep.service';
import { NgxViacepService } from '@brunoc/ngx-viacep';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
  ],
  providers: [
    DomService,
    NgxViacepService,
    ConsultaCepService,
  ]
})
export class ServicoModule { }
