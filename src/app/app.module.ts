import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './comum/componente/menu/menu.module';
import { RodapeModule } from './comum/componente/rodape/rodape.module';
import { AnexarModule } from './comum/servico/anexar/anexar.module';
import { MensagemModule } from './comum/servico/mensagem/mensagem.module';
import { AuthGuardService } from './comum/servico/auth-guard/auth-guard';
import { AutorizarTrocarSenhaResolve } from './autorizar-trocar-senha/autorizar-trocar-senha.resolve';
import { TrocarSenhaResolve } from './trocar-senha/trocar-senha.resolve';
import { ErrorIntercept } from './comum/servico/erro/error-intercept';

registerLocaleData(localePt, 'pt-BR');

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
    AuthGuardService,
    AutorizarTrocarSenhaResolve,
    TrocarSenhaResolve,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
