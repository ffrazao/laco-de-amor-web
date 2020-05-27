import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensagemService } from 'src/app/comum/servico/mensagem/mensagem.service';
import { ComprarCrudService } from './comprar.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {

  formulario = {
    nome: 'Comprar Matéria-Prima',
  };

  constructor(
    private _service: ComprarCrudService,
    private _mensagem: MensagemService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  public async excluir(event) {
    event.preventDefault();
    if (await this._mensagem.confirme('ATENÇÃO! Esta operação não poderá ser desfeita!\n\nConfirma a exclusão?')) {
      this._service.delete(this._service.entidade.id).subscribe(() => {
        this._mensagem.sucesso('Registro excluído!');
        this._router.navigate(['acao', this._service.funcionalidade]);
      });
    }
  }

  public get acao() {
    return this._service.acao;
  }

}
