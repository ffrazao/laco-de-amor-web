import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MensagemService } from './mensagem.service';
import { ConfirmeComponent } from './confirme.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ConfirmeComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MatDialogModule,
  ],
  providers: [MensagemService]
})
export class MensagemModule { }
