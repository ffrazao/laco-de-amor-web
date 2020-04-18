import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-modelo',
  templateUrl: './produto-modelo.component.html',
  styleUrls: ['./produto-modelo.component.scss']
})
export class ProdutoModeloComponent implements OnInit {

  formulario = {
    nome: 'Cadastro de Modelo de Produtos',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
