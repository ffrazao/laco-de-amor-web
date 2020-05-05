import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Produzir } from '../../../comum/entidade/modelo/produzir';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'Id'
  headElements = [
    'id',
  ];
  elements: Produzir[] = [];
  dataSource = new MatTableDataSource(this.elements);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((info) => {
      this.elements.length = 0;
      for (let i = 0; i < info.resolve.principal.length; i++) {
        this.elements.push(info.resolve.principal[i]);
      }
      this.dataSource = new MatTableDataSource(this.elements);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public exibeVinculo(reg) {
    let vinc =
      (reg.parceiro && reg.parceiro.id ? 'Parceiro (' + (reg.parceiro.funcao ? reg.parceiro.funcao : 'Não informado') + ') ' : '') +
      (reg.fornecedor && reg.fornecedor.id ? 'Fornecedor ' : '') +
      (reg.cliente && reg.cliente.id ? 'Cliente ' : '');
    return vinc ? vinc : 'Sem vínculo';
  }

}