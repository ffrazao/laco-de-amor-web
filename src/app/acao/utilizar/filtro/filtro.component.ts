import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilizarCrudService } from '../utilizar.service';
import { UtilizarFormService } from '../utilizar-form.service';
import { UtilizarFiltroDTO } from '../../../comum/modelo/dto/utilizar.filtro.dto';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public prod = environment.production;

  public frm: FormGroup;
  public isEnviado = false;

  constructor(
    private _service: UtilizarCrudService,
    private _formService: UtilizarFormService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.carregar(this._service.filtro);
  }

  public enviar() {
    this.isEnviado = true;
    this._service.filtro = this.frm.value;

    this._router.navigate(['acao', this._service.funcionalidade]);
  }

  public carregar(f: UtilizarFiltroDTO) {
    if (!f) {
      f = new UtilizarFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

}
