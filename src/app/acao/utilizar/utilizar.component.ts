import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utilizar',
  templateUrl: './utilizar.component.html',
  styleUrls: ['./utilizar.component.scss']
})
export class UtilizarComponent implements OnInit {

  formulario = {
    nome: 'Utilizar Matéria-Prima',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
