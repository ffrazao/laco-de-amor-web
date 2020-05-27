import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';
import { CotarCrudService } from './cotar.service';

@Component({
  selector: 'app-cotar',
  templateUrl: './cotar.component.html',
  styleUrls: ['./cotar.component.scss']
})
export class CotarComponent implements OnInit {

  formulario = {
    nome: 'Cotar Matéria-Prima',
  };

  constructor(
    private _service: CotarCrudService,
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
