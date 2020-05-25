import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProdutoModeloCrudService } from './produto-modelo.service';
import { MensagemService } from '../../comum/servico/mensagem/mensagem.service';

@Component({
  selector: 'app-produto-modelo',
  templateUrl: './produto-modelo.component.html',
  styleUrls: ['./produto-modelo.component.scss']
})
export class ProdutoModeloComponent implements OnInit {

  formulario = {
    nome: 'Cadastro de Modelo de Produtos',
  };

  constructor(
    private _service: ProdutoModeloCrudService,
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
        this._router.navigate(['cadastro', this._service.funcionalidade]);
      });
    }
  }

  public get acao() {
    return this._service.acao;
  }

}
