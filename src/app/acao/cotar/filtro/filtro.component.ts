import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CotarCrudService } from '../cotar.service';
import { CotarFormService } from '../cotar-form.service';
import { CotarFiltroDTO } from '../../../comum/modelo/dto/cotar.filtro.dto';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;

  constructor(
    private _service: CotarCrudService,
    private _formService: CotarFormService,
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

  public carregar(f: CotarFiltroDTO) {
    if (!f) {
      f = new CotarFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

}
