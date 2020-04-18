import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AnexarTipo } from './anexar-tipo';

@Component({
  selector: 'app-anexar',
  templateUrl: './anexar.component.html',
  styleUrls: ['./anexar.component.scss']
})
export class AnexarComponent implements OnInit {

  tipoAnexoEnum: string[];
  public tipoAnexoList: AnexarTipo[];

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.tipoAnexoEnum = Object.keys(AnexarTipo);
  }

}
