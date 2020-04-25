import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CotarService } from '../cotar.service';
import { CotarFiltro } from '../cotar-filtro';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  public frm: FormGroup;
  public isEnviado = false;
  public entidade: CotarFiltro;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private servico: CotarService,
    private router: Router) { }

  ngOnInit(): void {
      this.entidade = this.servico.filtro;
      this.frm = this.criarFormulario(this.entidade);
  }

  criarFormulario(entidade) {
    let result = this.formBuilder.group(
      {
      }
    );
    return result;
  }

  public enviar() {
    this.isEnviado = true;
    this.entidade = this.frm.value;
    this.servico.filtro = this.entidade;
    
    this.router.navigate(['acao', 'cotar']);
  }

}
