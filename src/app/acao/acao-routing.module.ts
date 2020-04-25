import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'cotar',
    loadChildren: () => import('./cotar/cotar.module').then(m => m.CotarModule)
  },
  {
    path: 'comprar',
    loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarModule)
  },
  {
    path: 'produzir',
    loadChildren: () => import('./produzir/produzir.module').then(m => m.ProduzirModule)
  },
  {
    path: 'vender',
    loadChildren: () => import('./vender/vender.module').then(m => m.VenderModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcaoRoutingModule { }
