import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: Pessoa[] = [];
  previous: Pessoa[] = [];
  headElements = ['Nome', 'Vínculo', 'Tipo', 'CPF/CNPJ', 'E-mail'];

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((info) => {
      this.elements.length = 0;
      for (let i = 0; i < info.resolve.principal.length; i++) {
        this.elements.push(info.resolve.principal[i]);
      }
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  public exibeVinculo(reg) {
    let vinc =
      (reg.parceiro && reg.parceiro.id ? 'Parceiro (' + (reg.parceiro.funcao ? reg.parceiro.funcao : 'Não informado') + ') ' : '') +
      (reg.fornecedor && reg.fornecedor.id ? 'Fornecedor ' : '') +
      (reg.cliente && reg.cliente.id ? 'Cliente ' : '');
    return vinc ? vinc : 'Sem vínculo';
  }

}