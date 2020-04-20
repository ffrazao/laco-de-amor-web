import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnexarService } from './anexar.service';
import { AnexarComponent } from './anexar.component';
import { ImagemComponent } from './imagem/imagem.component';
import { ImagemService } from './imagem/imagem.service';

@NgModule({
  declarations: [
    AnexarComponent,
    ImagemComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    AnexarComponent,
    ImagemComponent
  ],
  providers: [
    AnexarService,
    ImagemService
  ]
})
export class AnexarModule { }
