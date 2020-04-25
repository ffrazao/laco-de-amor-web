import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cotar',
  templateUrl: './cotar.component.html',
  styleUrls: ['./cotar.component.scss']
})
export class CotarComponent implements OnInit {

  formulario = {
    nome: 'Cotar Produtos',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
