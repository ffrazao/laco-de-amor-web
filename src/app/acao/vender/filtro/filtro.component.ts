import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { VenderCrudService } from '../vender.service';
import { VenderFormService } from '../vender-form.service';
import { VenderFiltroDTO } from '../../../comum/modelo/dto/vender.filtro.dto';

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
    private _service: VenderCrudService,
    private _formService: VenderFormService,
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

  public carregar(f: VenderFiltroDTO) {
    if (!f) {
      f = new VenderFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

}
