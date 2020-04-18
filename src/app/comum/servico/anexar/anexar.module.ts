import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagemModule } from './imagem/imagem.module';

import { AnexarService } from './anexar.service';
import { AnexarComponent } from './anexar.component';

@NgModule({
  declarations: [AnexarComponent],
  imports: [
    CommonModule,
    ImagemModule
  ],
  entryComponents: [
    AnexarComponent
  ],
  providers: [
    AnexarService
  ]
})
export class AnexarModule { }
