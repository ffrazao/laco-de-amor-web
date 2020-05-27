import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';
import { ProduzirCrudService } from './produzir.service';

@Component({
  selector: 'app-produzir',
  templateUrl: './produzir.component.html',
  styleUrls: ['./produzir.component.scss']
})
export class ProduzirComponent implements OnInit {

  formulario = {
    nome: 'Produzir Itens',
  };

  constructor(
    private _service: ProduzirCrudService,
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
