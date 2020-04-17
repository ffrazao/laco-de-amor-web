import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperarSenhaComponent } from './recuperar-senha.component';


const routes: Routes = [
  {path: '', component: RecuperarSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarSenhaRoutingModule { }
