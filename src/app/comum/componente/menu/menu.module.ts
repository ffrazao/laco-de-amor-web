import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    RouterModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule { }
