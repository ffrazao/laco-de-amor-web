import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardAdminService } from './../comum/servico/auth-guard/auth-guard.admin';

const routes: Routes = [
  {
    path: 'pessoa',
    loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
    canActivate: [AuthGuardAdminService]
  },
  {
    path: 'produto-modelo',
    loadChildren: () => import('./produto-modelo/produto-modelo.module').then(m => m.ProdutoModeloModule),
    canActivate: [AuthGuardAdminService],
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [AuthGuardAdminService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
