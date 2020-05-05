import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  formulario = {
    nome: 'Comprar Matéria-Prima',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
