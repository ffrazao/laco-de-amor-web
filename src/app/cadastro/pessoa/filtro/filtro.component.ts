import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PessoaCrudService } from '../pessoa.service';
import { PessoaFormService } from '../pessoa-form.service';
import { PessoaFiltroDTO } from '../../../comum/modelo/dto/pessoa.filtro.dto';

import { deEnumParaChaveValor } from '../../../comum/ferramenta/ferramenta-comum';
import { PessoaTipo } from '../../../comum/modelo/dominio/pessoa-tipo';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;

  public pessoaTipoList: any;

  constructor(
    private _service: PessoaCrudService,
    private _formService: PessoaFormService,
    private router: Router,
  ) {
    this.pessoaTipoList = deEnumParaChaveValor(PessoaTipo);
  }

  ngOnInit(): void {
    this.carregar(this._service.filtro);
  }

  public enviar() {
    this.isEnviado = true;
    this._service.filtro = this.frm.value;

    this.router.navigate(['cadastro', this._service.funcionalidade]);
  }

  public carregar(f: PessoaFiltroDTO) {
    if (!f) {
      f = new PessoaFiltroDTO();
    }
    this.frm = this._formService.criarFormularioFiltro(f);
  }

}
