import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule { }
