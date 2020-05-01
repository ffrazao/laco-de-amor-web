import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './comum/componente/menu/menu.module';
import { RodapeModule } from './comum/componente/rodape/rodape.module';
import { AnexarModule } from './comum/servico/anexar/anexar.module';
import { MensagemModule } from './comum/servico/mensagem/mensagem.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    
    AppRoutingModule,
    MenuModule,
    RodapeModule,
  ],
  exports: [
    MensagemModule,
    AnexarModule,
  ],
  entryComponents: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
