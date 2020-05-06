import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotarRoutingModule } from './cotar-routing.module';
import { CotarComponent } from './cotar.component';
import { ListResolve } from './list/list.resolve';
import { FormResolve } from './form/form.resolve';
import { FormNovoResolve } from './form/form-novo.resolve';
import { FiltroResolve } from './filtro/filtro.resolve';
import { CotarService } from './cotar.service';
import { CotarFormService } from './cotar-form.service';
import { UnidadeMedidaModule } from '../../cadastro/unidade-medida/unidade-medida.module';
import { EventoTipoModule } from '../../cadastro/evento-tipo/evento-tipo.module';
import { ProdutoModeloModule } from '../../cadastro/produto-modelo/produto-modelo.module';
import { PessoaModule } from '../../cadastro/pessoa/pessoa.module';
import { EventoPessoaFuncaoModule } from '../evento-pessoa-funcao/evento-pessoa-funcao.module';


@NgModule({
  declarations: [CotarComponent],
  imports: [
    CommonModule,
    CotarRoutingModule,
    UnidadeMedidaModule,
    EventoTipoModule,
    ProdutoModeloModule,
    PessoaModule,
    EventoPessoaFuncaoModule,
  ],
  providers: [
    CotarService,
    CotarFormService,
    ListResolve,
    FormResolve,
    FormNovoResolve,
    FiltroResolve
  ]

})
export class CotarModule { }
