import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {

  formulario = {
    nome: 'Cadastro de Pessoas',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
