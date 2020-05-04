import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { UnidadeMedidaModule } from '../../../cadastro/unidade-medida/unidade-medida.module';
import { PipeModule } from 'src/app/comum/pipe/pipe.module';
import { EventoPessoaFuncaoModule } from '../../evento-pessoa-funcao/evento-pessoa-funcao.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatAutocompleteModule,

    PipeModule,
    UnidadeMedidaModule,
    EventoPessoaFuncaoModule,
  ]
})
export class FormModule { }
