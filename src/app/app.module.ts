
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuModule } from './comum/componente/menu/menu.module';
import { RodapeModule } from './comum/componente/rodape/rodape.module';
import { MensagemModule } from './comum/servico/mensagem/mensagem.module';
import { AnexarModule } from './comum/servico/anexar/anexar.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MenuModule,
    RodapeModule,
    MensagemModule,
    AnexarModule,
  ],
  exports: [
    MDBBootstrapModule,
    ReactiveFormsModule,
    MensagemModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
