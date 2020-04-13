import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasaComponent } from './casa.component';
import { CasaRoutingModule } from './casa-routing.module';

@NgModule({
  declarations: [CasaComponent],
  imports: [
    CommonModule,
    CasaRoutingModule,
  ],
  exports: [CasaRoutingModule],
})
export class CasaModule { }
