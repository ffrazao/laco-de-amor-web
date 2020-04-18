import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'pessoa',
    loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule)
  },
  {
    path: 'produto-modelo',
    loadChildren: () => import('./produto-modelo/produto-modelo.module').then(m => m.ProdutoModeloModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
