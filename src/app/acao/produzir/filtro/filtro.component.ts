import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ProduzirCrudService } from '../produzir.service';
import { ProduzirFormService } from '../produzir-form.service';
import { ProduzirFiltroDTO } from '../../../comum/modelo/dto/produzir.filtro.dto';

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
    private _service: ProduzirCrudService,
    private _formService: ProduzirFormService,
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

  public carregar(f: ProduzirFiltroDTO) {
    if (!f) {
      f = new ProduzirFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

}
