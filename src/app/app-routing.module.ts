import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './comum/servico/auth-guard/auth-guard';
import { AutorizarTrocarSenhaResolve } from './autorizar-trocar-senha/autorizar-trocar-senha.resolve';
import { TrocarSenhaResolve } from './trocar-senha/trocar-senha.resolve';

const routes: Routes = [
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'acao',
    loadChildren: () => import('./acao/acao.module').then(m => m.AcaoModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaModule)
  },
  {
    path: 'autorizar-trocar-senha/:email',
    loadChildren: () => import('./autorizar-trocar-senha/autorizar-trocar-senha.module').then(m => m.AutorizarTrocarSenhaModule),
    resolve: { resolve: AutorizarTrocarSenhaResolve },
  },
  {
    path: 'trocar-senha/:email/:token',
    loadChildren: () => import('./trocar-senha/trocar-senha.module').then(m => m.TrocarSenhaModule),
    resolve: { resolve: TrocarSenhaResolve },
  },
  {
    path: '',
    loadChildren: () => import('./comum/componente/casa/casa.module').then(m => m.CasaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
