import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  	path: 'cadastro', 
  	loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule) 
  },
  {
  	path: 'acao', 
  	loadChildren: () => import('./acao/acao.module').then(m => m.AcaoModule) 
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
    path: 'trocar-senha',
    loadChildren: () => import('./trocar-senha/trocar-senha.module').then(m => m.TrocarSenhaModule)
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
