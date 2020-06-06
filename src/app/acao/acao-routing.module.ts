import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardAdminService } from '../comum/servico/auth-guard/auth-guard.admin';
import { AuthGuardAdminParceiroService } from '../comum/servico/auth-guard/auth-guard.admin.parceiro';

const routes: Routes = [
  {
    path: 'cotar',
    loadChildren: () => import('./cotar/cotar.module').then(m => m.CotarModule),
    canActivate: [AuthGuardAdminService],
  },
  {
    path: 'comprar',
    loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarModule),
    canActivate: [AuthGuardAdminService],
  },
  {
    path: 'utilizar',
    loadChildren: () => import('./utilizar/utilizar.module').then(m => m.UtilizarModule),
    canActivate: [AuthGuardAdminParceiroService],
  },
  {
    path: 'produzir',
    loadChildren: () => import('./produzir/produzir.module').then(m => m.ProduzirModule),
    canActivate: [AuthGuardAdminParceiroService],
  },
  {
    path: 'vender',
    loadChildren: () => import('./vender/vender.module').then(m => m.VenderModule),
    canActivate: [AuthGuardAdminService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcaoRoutingModule { }
