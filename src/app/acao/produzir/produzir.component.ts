import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produzir',
  templateUrl: './produzir.component.html',
  styleUrls: ['./produzir.component.scss']
})
export class ProduzirComponent implements OnInit {

  formulario = {
    nome: 'Produzir Itens',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
