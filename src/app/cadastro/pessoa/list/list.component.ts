import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Pessoa } from '../../../comum/modelo/entidade/pessoa';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // 'Nome', 'Vínculo', 'Tipo', 'CPF/CNPJ', 'E-mail'
  headElements = [
    'nome',
    'vinculo',
    'pessoaTipo',
    'cpfCnpj',
    'email',
  ];
  elements: Pessoa[] = [];
  dataSource = new MatTableDataSource(this.elements);

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((info) => {
      info.resolve.principal.subscribe(r => {
        this.elements.length = 0;
        for (let i = 0; i < r.length; i++) {
          this.elements.push(r[i]);
        }
        this.dataSource = new MatTableDataSource(this.elements);
      });
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